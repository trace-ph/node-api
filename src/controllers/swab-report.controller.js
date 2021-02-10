/* eslint-disable camelcase */
const nodeContactService = require('~services/node-contact.service');

const { getContactsInRange } = nodeContactService;
const { convertToDuration } = nodeContactService;
const { rssiCalibration } = nodeContactService;

// SAMPLE INPUT:
/*
const node_id = '0ea94fee138c58c';
const ref_date = new Date('2021-02-25'); // onset of illness, x
const result_date = new Date('2021-02-30'); // x+a
*/

// get close contacts
async function getCloseContacts(node_id, ref_date, result_date) {
  // let direct= await getContactsInRange(node_id,
  // ref_date, result_date, [-35,-30]);

  console.time('getContactsInRange');
  let proximal = await getContactsInRange(
    node_id, ref_date, result_date, [-50, 1],
  );
  console.timeEnd('getContactsInRange');

  console.log(`Docs extracted: ${proximal.length}`);

  console.time('convertToDuration');
  proximal = convertToDuration(proximal);
  console.timeEnd('convertToDuration');

  console.log(`Periph dur: ${JSON.stringify(proximal)}`);
  // proximal = proximal.filter(item => {item.duration >= 15});
  // let window_contacts = await rssiCalibration(window_contacts);

  return { proximal };
}

// notify close contacts
async function notifyCloseContacts(node_id, ref_date, result_date) {
  const contacts = await getCloseContacts(node_id, ref_date, result_date);
  // insert notification function here
  console.log('NOTIFIED CCs');
  // console.log(contacts.direct);
  console.log(contacts.proximal);
}

notifyCloseContacts(node_id, ref_date, result_date);
