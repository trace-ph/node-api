/*
	Checks the rssiCalibration() and saves the data as attenuated
	in a different data collection
*/
require('../configs/database.config').config();
const nodeContactService = require('~services/node-contact.service');
const mongoose = require('mongoose');
const NodeContacts = require('~models/node-contact.model');

const { close } = require('../configs/database.config');
const { rssiCalibration } = nodeContactService;
const { Schema } = mongoose;

// Setup new model schema
const attenuationSchema = new Schema({
	timestamp: { type: Schema.Types.Date, required: true },
	source_node_id: { type: Schema.Types.String, required: true },
    node_pairs: [{ type: Schema.Types.String, required: true }],
    attenuation: { type: Schema.Types.Number, required: true },
});

const Attenuation = mongoose.model('test', attenuationSchema);


// Get all data contacts and save them as calibrated
NodeContacts.find({}).then(async (docs) => {
	docs = await rssiCalibration(docs);
	docs.forEach(async (contact, index, array) => {
		await Attenuation.create({
			timestamp: contact.timestamp,
			source_node_id: contact.source_node_id,
			node_pairs: contact.node_pairs,
			attenuation: contact.rssi,
		});

		if(index == array.length - 1)
			close();
	});
});
