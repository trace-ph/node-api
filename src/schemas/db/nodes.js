'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = connection => {
  const NodeSchema = new Schema(
    {
      // As per TOR, this value must be determined based on device_id + person_id.
      node_id: { type: Schema.Types.String, required: true },

      device_id: { type: Schema.Types.String, required: true },

      person_id: { type: Schema.Types.String, required: true }
    },
    {
      timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
  );

  return connection.model('Node', NodeSchema);
};
