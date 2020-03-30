'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
	device_id: { type: Schema.Types.String, required: true }
});

module.exports = mongoose.model('Device', deviceSchema);
