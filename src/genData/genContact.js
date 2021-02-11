/*
	Generates neither direct nor proximal contacts to database
	> node_id = C; Neither (dist > 2m && time < 15 min)

	Notes:
	> Time interval of the timestamp is a difference of 1-7 seconds with the
	difference happening more as 1 or 6
*/

require('../configs/database.config').config();

const NodeContacts = require('~models/node-contact.model');
const Nodes = require('~models/nodes.model');
const Calibration = require('~models/calibration.model');

const conf = require('./conf.js');


// Insert direct contact node in the node collection
Nodes.exists({ node_id : conf.node_C })
	.then((yes) => {
		if(yes)
			console.log(`${conf.node_C} exists`);
		else{
			var node = {
				node_id: conf.node_C,
				device_id : 'a',
				device_model : conf.deviceModelC,
			};

			Nodes.create(node);
			console.log(`${conf.node_C} created`);
		}
	});

// Insert a node contacts schema in nodecontacts collection
Calibration.findOne({ ' model' : conf.deviceModelC }, function(err, calibModel) { // Find the calibration info
	if(err) return handleError(err);

	console.log(calibModel);

	var date = conf.date;
	var timelimit = conf.timelimit;

	// Create node contacts of D to A - Direct contacts
	for(i = 0, docs = 0; i <= timelimit; docs++){
		var contacts = {													// Variable that includes the info for the schema to be inserted
			type : 'direct-bluetooth',
			timestamp : date,
			source_node_id : conf.node_D,
			node_pairs : [conf.node_D, conf.node_C].sort(),
			rssi : Math.floor(calibModel.tx - (Math.random() * conf.atten_3m) - calibModel['rssi correction'] - conf.atten_2m),
			txPower : -15,
			ip : '127.0.0.1'
		};

		NodeContacts.create(contacts);

		// Update date by 1 to 7 second interval
		var second = Math.floor((Math.random() * 7));
		i += second;
		date = new Date(date.getTime() + (second * 1000));

		if(i > timelimit){
			console.log(`${conf.node_C} contacts done~!`);
			console.log(`Generated ${docs} documents`);
		}
	}
});
