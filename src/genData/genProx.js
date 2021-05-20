/*
	Generates proximal contacts to database (accumulated time)
	> node_id = B; Proximal (2m < dist < 3m && time > 15 min)

	Notes:
	> Time interval of the timestamp is a difference of 1-7 seconds with the
	difference happening more as 1 or 6
	> Proximal contact time is accumulated 15 minutes. See genProxC.js for
	continuous 15 minutes
*/

require('../configs/database.config').config();
const { close } = require('../configs/database.config');

const NodeContacts = require('~models/node-contact.model');
const Nodes = require('~models/nodes.model');
const Calibration = require('~models/calibration.model');

const conf = require('./conf.js');


// Insert proximal contact node in the node collection
Nodes.exists({ node_id: conf.node_B })
  .then((yes) => {
    if (yes) console.log(`${conf.node_B} exists`);
    else {
      const node = {
        node_id: conf.node_B,
        device_id: 'b',
        device_model: conf.deviceModelB,
      };

      Nodes.create(node);
      console.log(`${conf.node_B} created`);
    }
  });

// Insert a node contacts schema in nodecontacts collection
Calibration.findOne({ ' model': conf.deviceModelB }, async (err, calibModel) => { // Find the calibration info
  if (err) return handleError(err);

  console.log(calibModel);

  let { date } = conf;
  const { timelimit } = conf;

  // Create node contacts of D to B - Proximal contacts
  for (i = 0, docs = 0; i <= conf.min15tosec;) {
    let time = Math.floor((Math.random() * timelimit));
    for (j = 0; j <= time; docs++) {
      const contacts = {													// Variable that includes the info for the schema to be inserted
        type: 'direct-bluetooth',
        timestamp: date,
        source_node_id: conf.node_D,
        node_pairs: [conf.node_D, conf.node_B].sort(),
        rssi: Math.floor(calibModel.tx - (Math.random() * conf.atten_3m) - calibModel['rssi correction'] - conf.atten_2m),
        txPower: -15,
        ip: '127.0.0.1',
      };

      await NodeContacts.create(contacts);

      // Update date by 1 to 7 second interval
      const second = Math.floor((Math.random() * 7));
      i += second;
      j += second;
      date = new Date(date.getTime() + (second * 1000));
    }

    // Create time gap
    time = Math.floor((Math.random() * timelimit));
    date = new Date(date.getTime() + (time * 1000));

    if (i > conf.min15tosec) {
      console.log(`${conf.node_B} contacts done~!`);
      console.log(`Generated ${docs} documents`);
	  close();
    }
  }
});
