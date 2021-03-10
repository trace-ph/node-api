/* eslint-disable camelcase */
const nodeContactService = require('~services/node-contact.service');

const { getContactsInRange } = nodeContactService;
const { convertToDuration } = nodeContactService;
const { rssiCalibration } = nodeContactService;

// SAMPLE INPUT:
// const node_id = '0ea94fee138c58c';
// const node_id = 'D';
// const ref_date = new Date('2021-02-7'); // onset of illness, x
// const result_date = new Date('2021-02-11'); // x+a


// Categorize contacts to direct or proximal based on RSSI attenuation
function filterContacts(doc) {
  const direct = [];
  const proximal = [];

  doc.forEach((contact) => {
    if (contact.rssi <= 27) direct.push(contact);
    else if (contact.rssi > 27 && contact.rssi <= 51) proximal.push(contact);
  });

  return { direct, proximal };
}

// Filter out the actual proximal contacts
function filterProximal(doc) {
  const res = {};
  for (const [node_id, duration] of Object.entries(doc)) if (duration > 15) res[node_id] = duration;

  return res;
}

// get close contacts
async function getCloseContacts(node_id, ref_date, result_date) {
  // let direct= await getContactsInRange(node_id,
  // ref_date, result_date, [-35,-30]);

  console.time('getContactsInRange');
  let window_contacts = await getContactsInRange(
    node_id, ref_date, result_date, [-80, 1],
  );
  console.timeEnd('getContactsInRange');

  console.log(`Docs extracted: ${window_contacts.length}`);

  // Distance filter
  console.time('Distance filter');
  window_contacts = await rssiCalibration(window_contacts);
  let { direct, proximal } = filterContacts(window_contacts);
  console.timeEnd('Distance filter');
  // console.log(direct);
  // console.log(proximal);

  console.time('convertToDuration');
  direct = convertToDuration(direct, node_id);
  proximal = convertToDuration(proximal, node_id);
  console.timeEnd('convertToDuration');

  console.log(`Periph dur: ${JSON.stringify(direct)}`);
  console.log(`Periph dur: ${JSON.stringify(proximal)}`);
  // proximal = proximal.filter(item => {item.duration >= 15});
  proximal = filterProximal(proximal);

  return { direct, proximal };
}

// notify close contacts
async function notifyCloseContacts(node_id, ref_date, result_date) {
  const contacts = await getCloseContacts(node_id, ref_date, result_date);
  // insert notification function here
  console.log('NOTIFIED CCs');
  console.log(contacts.direct);
  console.log(contacts.proximal);
}

// Handles the report from auth-api
function swabReport(request, response) {
  console.log(request.body);
  const { node_id, patient_info } = request.body;

  if (patient_info.test_result) notifyCloseContacts(node_id, new Date(patient_info.reference_date), new Date(patient_info.test_result_date));

  response.status(201).json({ success: true });
}

// notifyCloseContacts(node_id, ref_date, result_date);

module.exports = {
  swabReport,
};
