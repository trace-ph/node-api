/* eslint-disable camelcase */
const nodeContactService = require('~services/node-contact.service');
const SwabReports = require('~models/swab-report.model');

const { getContactsInRange } = nodeContactService;
const { convertToDuration } = nodeContactService;
const { rssiCalibration } = nodeContactService;
const { notified } = nodeContactService;
const { filterContacts, filterDirect, filterProximal } = nodeContactService;


// get close contacts
async function getCloseContacts(node_id, ref_date, result_date) {
  console.time('getContactsInRange');
  let window_contacts = await getContactsInRange(node_id, ref_date, result_date, );
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

  // console.log(`Direct dur: ${JSON.stringify(direct)}`);
  // console.log(`Proximal dur: ${JSON.stringify(proximal)}`);
	direct = filterDirect(direct);
  proximal = filterProximal(direct, proximal);
  // console.log(`Direct: ${JSON.stringify(direct)}`);
  // console.log(`Proximal: ${JSON.stringify(proximal)}`);

  return { direct, proximal };
}

// notify close contacts
async function notifyCloseContacts(node_id, ref_date, result_date) {
  const contacts = await getCloseContacts(node_id, ref_date, result_date);

  // Insert those who are notified for the day
	console.log('NOTIFIED CCs');
  notified(contacts.direct, 'direct');
  notified(contacts.proximal, 'proximal');
}

// Handles the report from auth-api
function swabReport(request, response) {
  // console.log(request.body);
  const { node_id } = request.body;

  // Get patient_info
  SwabReports.findOne({ node_id: node_id })
  .then((doc) => {
	let patient_info = doc.patient_info;

  	if (patient_info.test_result)
			notifyCloseContacts(node_id, new Date(patient_info.reference_date), new Date(patient_info.test_result_date));

  	response.status(201).json({ success: true });
  });
}

module.exports = {
  swabReport,
};
