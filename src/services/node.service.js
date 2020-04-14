/* eslint camelcase: 0 */

const crypto = require('crypto');
const Node = require('~models/nodes.model');
const logger = require('~logger');

const save = async (device_id) => {
  logger.info(`Creating new node for device id {${device_id}}`);
  const node = { device_id };
  node.node_id = crypto.createHmac('sha256', process.env.HASH_KEY)
    .update(device_id)
    .digest('hex')
    .substr(0, 15);
  return new Node(node).save();
};

const find = async (node) => Node.find(node);

module.exports = {
  save,
  find,
};
