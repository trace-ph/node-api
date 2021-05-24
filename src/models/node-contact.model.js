const mongoose = require('mongoose');

const { Schema } = mongoose;

const NodeContactSchema = new Schema(
  {
    // Handling of different types of contact
    type: {
      type: Schema.Types.String,
      enum: ['direct-bluetooth', 'direct-network', 'indirect', 'manual'],
      required: true,
    },

    // Must be client generated since offline storage of data is assumed.
    timestamp: { type: Schema.Types.Date, required: true },

    // This field refer to the node who sent this record.
    source_node_id: { type: Schema.Types.String, required: true },

    // As per TOR the pairings must be stored such that node_id_a < node_id_b.
    // A node_pair with a single data is allowed to handle 'Indirect' contact. See TOR 2c.
    node_pairs: [{ type: Schema.Types.String, required: true }],

    rssi: { type: Schema.Types.Number, required: true },

    txPower: { type: Schema.Types.Number, required: true },

    // Location stored in GeoJSON format
    // location: {
    //   type: {
    //     type: Schema.Types.String, // Don't do `{ location: { type: String } }`
    //     enum: ['Point'], // 'location.type' must be 'Point'
    //     required: true,
    //   },
    //   coordinates: {
    //     type: [Schema.Types.Number],
    //     required: true,
    //   },
    // },

    // Not clear on the TOR if this is determined on the client side or server side.
    // We'll assume that this is determined on the server.
    // ip: { type: Schema.Types.String, required: true },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

module.exports = mongoose.model('NodeContact', NodeContactSchema);
