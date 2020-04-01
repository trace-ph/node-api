'use strict';

const Node = require('~models/nodes.model');
const { v5: uuidv5, v4: uuidv4 } = require('uuid');
const logger = require('~logger');

const save = async device_id => {
	logger.info(`Creating new node for device id {${device_id}}`);
	const node = { device_id, person_id: uuidv4() };
	node.node_id = uuidv5(
		`${device_id}${node.person_id}`,
		process.env.HASH_KEY
	);

	return await new Node(node).save();
};

const find = async node => {
	return await Node.find(node);
};

module.exports = {
	save,
	find
};
