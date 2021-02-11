/*
	Generates proximal contacts to database (continuous time)
	> node_id = B; Proximal (2m < dist < 3m && time > 15 min)

	Notes:
	> Time interval of the timestamp is a difference of 1-7 seconds with the
	difference happening more as 1 or 6
	> Proximal contact time is continuous 15 minutes. See genProx.js for
	accumulated 15 minutes
*/

require('../configs/database.config').config();

const NodeContacts = require('~models/node-contact.model');
const Nodes = require('~models/nodes.model');
const Calibration = require('~models/calibration.model');

const conf = require('./conf.js');


// Insert proximal contact node in the node collection
Nodes.exists({ node_id : conf.node_B })
	.then((yes) => {
		if(yes)
			console.log(`${conf.node_B} exists`);
		else{
			var node = {
				node_id: conf.node_B,
				device_id : 'b',
				device_model : conf.deviceModelB,
			};

			Nodes.create(node);
			console.log(`${conf.node_B} created`);
		}
	});

// Insert a node contacts schema in nodecontacts collection
Calibration.findOne({ ' model' : conf.deviceModelB }, function(err, calibModel) { // Find the calibration info
	if(err) return handleError(err);

	console.log(calibModel);

	var date = conf.date;

	// Create node contacts of D to A - Direct contacts
	for(i = 0, docs = 0; i <= conf.min15tosec; docs++){
		var contacts = {													// Variable that includes the info for the schema to be inserted
			type : 'direct-bluetooth',
			timestamp : date,
			source_node_id : conf.node_D,
			node_pairs : [conf.node_D, conf.node_B].sort(),
			rssi : Math.floor(calibModel.tx - (Math.random() * conf.atten_3m) - calibModel['rssi correction'] - conf.atten_2m),
			txPower : -15,
			ip : '127.0.0.1'
		};

		NodeContacts.create(contacts);

		// Update date by 1 to 7 second interval
		var second = Math.floor((Math.random() * 7));
		i += second;
		date = new Date(date.getTime() + (second * 1000));

		if(i > conf.min15tosec){
			console.log(`${conf.node_B} contacts done~!`);
			console.log(`Generated ${docs} documents`);
		}
	}
});
