/*
	Schema for Google RSSI calibration
*/

const mongoose = require('mongoose');

const { Schema } = mongoose;

const CalibrationSchema = new Schema({
	manufacturer: { type: Schema.Types.String, required: true },
	device: { type: Schema.Types.String, required: true },
	' model': { type: Schema.Types.String, required: true },
	'rssi correction': { type: Schema.Types.Number, required: true },
	tx: { type: Schema.Types.Number, required: true },
	'calibration confidence': { type: Schema.Types.Number, required: true },
});

CalibrationSchema.index({ ' model': 1 });

module.exports = mongoose.model('calibration', CalibrationSchema);
