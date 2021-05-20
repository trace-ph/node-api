const mongoose = require('mongoose');

const { Schema } = mongoose;

const NodeSchema = new Schema(
  {
    // As per TOR, this value must be determined based on device_id + person_id.
    node_id: { type: Schema.Types.String, required: true },

    device_id: { type: Schema.Types.String, required: true },

    device_model: { type: Schema.Types.String, required: true },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

module.exports = mongoose.model('Node', NodeSchema);
