/*
	Generates notified contacts
*/

require('../configs/database.config').config();
const NotifiedContacts = require('~models/notified-contact.model');

// const node_id = 'D';
const node_id = '0ea94fee138c58c';

NotifiedContacts.deleteMany({ node_id: node_id })
.then(res => console.log(res));

NotifiedContacts.create({
	node_id: node_id,
	contact: 'direct',
	notif: false,
}).then(() => console.log('Okie'));
