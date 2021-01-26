/* eslint-disable camelcase */
const nodeContactService = require('~services/node-contact.service');

const { getContactsInWindow } = nodeContactService;
const { convertToDuration } = nodeContactService;
const { rssiCalibration } = nodeContactService;
const { filter } = nodeContactService;

// SAMPLE INPUT:
// const node_id = '123';
// const ref_date = new Date('2021-01-02'); // onset of illness, x
// const result_date = new Date('2021-01-07'); // x+a

// get close contacts
async function getCloseContact(node_id, ref_date, result_date) {
  let window_contacts = await getContactsInWindow(node_id, ref_date, result_date);
  window_contacts = convertToDuration(window_contacts);
  window_contacts = rssiCalibration(window_contacts);

  const direct = filter(window_contacts, query = '2m<dist<=3m and dur<=15min');
  const proximal = filter(window_contacts, query = 'dist <=2m');

  return { direct, proximal };
}

// notify close contacts
async function notifyCloseContacts(node_id, ref_date, result_date) {
  const contacts = await getCloseContact(node_id, ref_date, result_date);
  // insert notification function here
  console.log('NOTIFIED CCs');
  console.log(contacts.direct);
  console.log(contacts.proximal);
}

// notifyCloseContacts(node_id, ref_date, result_date);
