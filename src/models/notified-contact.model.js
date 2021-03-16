const mongoose = require('mongoose');

const { Schema } = mongoose;

const NotifiedContactSchema = new Schema({

    // Notified contacts
    node_id: { type: Schema.Types.String, required: true },

    // Type of contact
    contact: {
		type: Schema.Types.String,
		enum: ['direct', 'proximal'],
		required: true
	},

}, {

    timestamps: { createdAt: 'created_at' },

});

module.exports = mongoose.model('NotifiedContact', NotifiedContactSchema);
