'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = (connection) => {
  const DeviceSchema = new Schema({
    device_id: { type: Schema.Types.String, required: true }
  });

  return connection.model('Device', DeviceSchema);
};
