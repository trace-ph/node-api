/* eslint-disable camelcase */
// require('../configs/database.config').config();
const NodeContacts = require('~models/node-contact.model');

// TODO: FIX TIMEZONES!

async function getContactsInWindow(node_id, reference_date, result_date) {
  /**
   * Extract contacts made 2 days before onset of illness/testing date, to
   * when testing results came out.
   */

  // change reference to start of the day: x-2
  reference_date.setDate(reference_date.getDate() - 2);
  reference_date.setHours(24, 0, 0);

  // change result/end date to the end of test result day
  result_date.setHours(24, 0, 0);

  // filter by node_id, and (x-2 : x+a)
  return NodeContacts
    .find({ source_node_id: node_id })
    .where('timestamp').gt(reference_date).lt(result_date)
    .exec();

  // NOTE: May use select() here to minimize output size
}

function convertToDuration(res) {
  console.log('Group timestamps of a nodepair into duration');
  return res;
}

function rssiCalibration(res) {
  console.log('RSSI calibration');
  return res;
}

function filter(res, query) {
  console.log(`filter by ${query}`);
  return res;
}

module.exports = {
  getContactsInWindow,
  convertToDuration,
  rssiCalibration,
  filter,
};
