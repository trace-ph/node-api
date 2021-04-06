const express = require('express');
const logger = require('~logger');
const NotifiedContacts = require('~models/notified-contact.model');

const router = express.Router();

const connections = {};


// Polls the connections
router.post('/', (req, res) => {
	const { node_id } = req.body;

	connections[node_id] = res;

	// If connection is already disconnected, remove in connections list
	req.on("close", () => {
		// Delete in connections list
		delete connections[node_id];

		// console.log(`${node_id} disconnected`);
	});
});


const delay = 1000 * 5;			// 1 second * multiplier

// Checks if there's notification to be sent every 1 minute
setTimeout(function check() {
	// console.log(connections);
	for(const [node_id, res] of Object.entries(connections)) {
		// console.log(node_id);
		NotifiedContacts.findOne({ node_id: node_id }, (err, doc) => {
			if(err) return console.error(err);
			if(doc == null) return;

			// Send notif if the user wasn't notified yet
			if(!doc.notif){
				res.status(200).send("You have been exposed");

				// Delete in connections list
				delete connections[node_id];

				// Update doc
				doc.notif = true;
				doc.save();

				logger.info(`${node_id} is notified`);
			}
		});
	}

	setTimeout(check, delay);
}, delay);


module.exports = router;

/*
Code Reference:
	https://github.com/satansdeer/req-res-streams/blob/master/index.js
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
	https://stackoverflow.com/questions/3455405/how-do-i-remove-a-key-from-a-javascript-object
*/
