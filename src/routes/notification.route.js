const express = require('express');
const logger = require('~logger');
const NotifiedContacts = require('~models/notified-contact.model');

const router = express.Router();

const connections = {};


// Polls the connections
router.post('/', (req, res) => {
	const { node_id } = req.body;

	// Disregard null node_id
	if(node_id == null)
		return res.status(400).send();

	// Handle duplicates
	if(connections[node_id] != null)
		connections[node_id].status(400).send();

	logger.info(`${node_id} connected`);
	connections[node_id] = res;

	// If connection is already disconnected, remove in connections list
	req.on("close", () => {
		// Delete in connections list
		delete connections[node_id];

		logger.info(`${node_id} disconnected`);
	});
});


const delayNotif = 1000 * 60;				// 1 minute

// Checks if there's notification to be sent every 1 minute
setTimeout(function check() {
	// logger.info('Checking NotifiedContacts...');
	for(const [node_id, res] of Object.entries(connections)) {
		// console.log(node_id);
		NotifiedContacts.findOne({ node_id: node_id }, (err, doc) => {
			if(err) return console.error(err);
			if(doc == null) return;

			// Send notif if the user wasn't notified yet
			if(!doc.notif){
				let date = formatDate(doc.created_at);
				let message = `We have determined that you are a ${doc.contact} contact on ${date}.\nPlease contact your designated health personnel or contact tracer of your area.`;
				res.status(200).send(message);

				// Delete in connections list
				delete connections[node_id];
				logger.info(`${node_id} is notified`);
			}
		});
	}

	setTimeout(check, delayNotif);
}, delayNotif);


// Receives confirmation of notification
router.post('/confirm', (req, res) => {
	const { node_id } = req.body;
	NotifiedContacts.findOne({ node_id: node_id }, (err, doc) => {
		// Update doc
		doc.notif = true;
		doc.save();

		logger.info(`CONFIRMED: ${node_id} is notified`);
		res.status(200).send("Confirmation received");
	});
});


const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function formatDate(createdDate){
	let m = month[createdDate.getMonth()];
	let d = createdDate.getDate();
	let y = createdDate.getFullYear();
	let h = createdDate.getHours();
	let min = createdDate.getMinutes();
	if(h > 12 && (h % 12) != 0)
		return date = m + ' ' + d + ', ' + y + ' ' + (h % 12) + ':' + min + 'PM';
	else if(h > 12 && (h % 12) == 0)
		return date = m + ' ' + d + ', ' + y + ' 12:' + min + 'PM';
	else if(h < 12 && h != 0)
		return date = m + ' ' + d + ', ' + y + ' ' + h + ':' + min + 'AM';
	else
		return date = m + ' ' + d + ', ' + y + ' 12:' + min + 'AM';
}


module.exports = router;

/*
Code Reference:
> Express req-res
	https://github.com/satansdeer/req-res-streams/blob/master/index.js
> JS Objects
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
	https://stackoverflow.com/questions/3455405/how-do-i-remove-a-key-from-a-javascript-object
> Client disconnect
	https://stackoverflow.com/questions/6572572/node-js-http-server-detect-when-clients-disconnect
	https://stackoverflow.com/questions/7348736/how-to-check-if-connection-was-aborted-in-node-js-server
*/
