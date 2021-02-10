/*
	Fills calibration collection with the calibration data from Google

Code reference:
	https://stackoverflow.com/questions/54587040/import-external-json-file-to-mongodb-using-nodejs-and-mongoose
*/

require('../configs/database.config').config();
const Calibration = require('~models/calibration.model');
const fs = require('fs');

const data = '../data/Google_calibration.json';
let infoData = fs.readFileSync(data);
let info = JSON.parse(infoData);

info.forEach((doc) => {
	// console.log(doc);
	Calibration.create({
		id: doc._id.$oid,
		manufacturer: doc.manufacturer,
	    device: doc.device,
	    ' model': doc[' model'],
	    'rssi correction': doc['rssi correction'],
	    tx: doc.tx,
	    'calibration confidence': doc['calibration confidence'],
	})
	.then((result) => console.log(result))
    .catch((err) => console.log(err));
});
