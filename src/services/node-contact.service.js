/* eslint-disable camelcase */
// require('../configs/database.config').config();
const Nodes = require('~models/nodes.model');
const NodeContacts = require('~models/node-contact.model');
const Calibration = require('~models/calibration.model');
const NotifiedContacts = require('~models/notified-contact.model');


async function getContactsInRange(
  node_id,
  reference_date,
  result_date,
  dist_range = [-100, 0],
) {
  /**
   * Within contacts made 2 days before illness/testing date, to
   * when testing results came out, extract those contacted within dist.
   * NOTE: Assumes input has already been calibrated
   */

  // change reference to start of the day: x-2
  reference_date.setDate(reference_date.getDate() - 2);

	// Change result date to be 12 midnight of the next day
	result_date.setDate(result_date.getDate() + 1);
	console.log("Getting docs - From: ", reference_date, " to ", result_date);

  // filter by node_id, (x-2 : x+a), and rssi (in meters) < dist.
  return NodeContacts
    .find({
      node_pairs: { $eq: node_id },
      timestamp: { $gte: reference_date, $lte: result_date },
      rssi: { $gt: dist_range[0], $lte: dist_range[1] },
    })
    .select(['node_pairs', 'timestamp', 'rssi', 'source_node_id', 'txpower'])
    // .where('timestamp').gt(reference_date).lt(result_date)
    // .where('rssi')
    .exec();
}

function convertToDuration(docs, node_id) {
  /**
   * Group timestamps of a contact with a periph into a blob of duration.
   */
  const docs_periph = {}; // {periph id : [timestamp...]}
  const max_gap = 15000; // max gap in a continuous duration, in millisec; 15 seconds
  let periph_id;

  // TODO: determine optimal value for max_gap based on scanning and upload
  // intervals

  // group timestamps of each peripheral (node pair)
  docs.forEach((doc) => { // O(n)
    periph_id = doc.node_pairs[node_id === doc.node_pairs[0] ? 1 : 0];
    if (periph_id in docs_periph) {
      docs_periph[periph_id].push(doc.timestamp);
    } else {
      docs_periph[periph_id] = [doc.timestamp];
    }
  });

  for (const id in docs_periph) {
    // sort by time
    docs_periph[id].sort(); // probably O(nlogn)

    // if adjacent timestamp is later than X seconds, consider as diff blob
    // NOTE: Let's make X=7
    let time_init = docs_periph[id][0]; // initial time of contact
		let time_last = time_init; // time of last contact
		let today = new Date(new Date(time_init).setHours(24, 0, 0));	// Current day
		let tomorrow = new Date(today);	// Day after
		tomorrow.setDate(today.getDate() + 1);
		let max = {
			duration: 0,
			day: today,
		};
    let durations = []; // for blobs of contact duration with a periph
    const num_periphs = docs_periph[id].length;

    // console.log('--------------------');
    for (let i = 1; i < num_periphs; i++) { // O(n)
      time_last = docs_periph[id][i - 1];
      const time_gap = docs_periph[id][i] - time_last;

			// If the time blob should start on the next day
			if ( time_last > tomorrow && i !== num_periphs - 1) {
				// console.log(`Duration array: ${durations}`);
				// console.log(today, durations.reduce((a, b) => a + b, 0));

				if (durations.reduce((a, b) => a + b, 0) > max.duration){
					max = {
						duration: durations.reduce((a, b) => a + b, 0),	// sum all contact durations
						day: today,
					};
				}

				time_init = time_last;
				today = new Date(new Date(time_init).setHours(24, 0, 0));
				tomorrow = new Date(today);
				tomorrow.setDate(today.getDate() + 1);
				durations = [];
				continue;
			}

      if (time_gap > max_gap) {
        // means i belongs to another duration, so take this as a dur
				// console.log(`dur: ${new Date(time_init).toLocaleTimeString()} -- ${new Date(time_last).toLocaleTimeString()}`);
        // console.log(`gap: ${time_gap / 1000}s`);
        durations.push((time_last - time_init) / 1000 / 60); // in mins
        time_init = docs_periph[id][i];
        time_last = time_init;

      } else if (i === num_periphs - 1) {
        // reached the end and i is still part of the current blob
        durations.push((docs_periph[id][i] - time_init) / 1000 / 60); // in mins
        // console.log(`dur: ${new Date(time_init).toLocaleTimeString()} -- ${new Date(time_last).toLocaleTimeString()}`);
      }
    }
    // console.log('--------------------');

		if(durations.reduce((a, b) => a + b, 0) > max.duration)
			docs_periph[id] = {
				duration: durations.reduce((a, b) => a + b, 0),
				day: today
			};
		else
			docs_periph[id] = max;

  }

  return docs_periph;
}

async function rssiCalibration(res) {
  // console.log('RSSI calibration');

  // Use node_ID of pair to get the corresponding RSSI correction and txPower based on its device model
  for (i = 0; i < res.length; i++) {
    const contact = res[i];
    const pairNode_id = contact.node_pairs[contact.source_node_id === contact.node_pairs[0] ? 1 : 0];
    const node = await Nodes.findOne({ node_id: pairNode_id }).select(['device_model']);
    const deviceInfo = await Calibration.findOne({ ' model': node.device_model }).select(['tx', 'rssi correction']);

	// If not within the calibration data, assume iOS device; Replace RSSI with attenuation [1,3]
	if(deviceInfo == undefined || deviceInfo == null)
		res[i].rssi = contact.txPower - contact.rssi;
	else
  	res[i].rssi = deviceInfo.tx - (contact.rssi + deviceInfo['rssi correction']);
  }

  return res;
}

// Saves who are notified contacts
async function notified(res, type){
	let today = new Date(new Date().setHours(0, 0, 0));
	let tomorrow = new Date(today);
	tomorrow.setDate(today.getDate() + 1);

	for (const [node_id, day] of Object.entries(res)){
		// Checks if there is notification set for the day. Should only have one notification a day per node_id
		let exist = await NotifiedContacts.exists({ node_id: node_id, created_at: { $gte: today, $lt: tomorrow }});
		if(!exist){
			NotifiedContacts.create({
				node_id: node_id,
				contact: type,
				notif: false,
			})
			.then((res) => console.log(node_id, day))
			.catch((err) => logger.error(err));
		}
	}
}


// Categorize contacts to direct or proximal based on RSSI attenuation
function filterContacts(doc) {
  const direct = [];
  const proximal = [];

  // Attenuation constants
  const direct_atten = 50;		// Approximately within 2 meters
  const prox_atten = 90;		// Approximately within 3 meters

  doc.forEach((contact) => {
    if (contact.rssi <= direct_atten) direct.push(contact);
    if (contact.rssi <= prox_atten) proximal.push(contact);
  });

  return { direct, proximal };
}

// Filter out the actual direct contacts
function filterDirect(direct) {
	const res = {};

	for (const [node_id, obj] of Object.entries(direct))
		if (obj.duration > 0.3)
		  res[node_id] = obj.day;

  return res;
}

// Filter out the actual proximal contacts
// Ensures no duplicates with determined direct contacts
function filterProximal(direct, proximal) {
	const res = {};

	for (const [node_id, obj] of Object.entries(proximal))
		if (obj.duration > 15 && direct[node_id] == null)
		  res[node_id] = obj.day;

  return res;
}

module.exports = {
  getContactsInRange,
  convertToDuration,
  rssiCalibration,
  notified,
  filterContacts,
	filterDirect,
  filterProximal,
};

/*
References:
[1]	https://developers.google.com/android/exposure-notifications/ble-attenuation-overview#attenuations_as_distance_proxy
[2] https://itnext.io/performance-tips-for-mongodb-mongoose-190732a5d382
[3] https://developer.apple.com/documentation/exposurenotification/enexposureconfiguration/exposure_risk_value_calculation_in_exposurenotification_version_1
*/
