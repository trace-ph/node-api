/* eslint camelcase: 0 */

const { v5: uuidv5, v4: uuidv4 } = require('uuid');
const Node = require('~models/nodes.model');
const logger = require('~logger');

const save = async (device_id) => {
  logger.info(`Creating new node for device id {${device_id}}`);
  const node = { device_id, person_id: uuidv4() };
  node.node_id = uuidv5(
    `${device_id}${node.person_id}`,
    process.env.HASH_KEY,
  );
  return new Node(node).save();
};

const find = async (node) => Node.find(node);

module.exports = {
  save,
  find,
};
