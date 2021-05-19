/*
	Fills calibration collection with the calibration data from Google

Code reference:
	https://stackoverflow.com/questions/54587040/import-external-json-file-to-mongodb-using-nodejs-and-mongoose
*/

const fs = require('fs');
require('../configs/database.config').config();
const { close } = require('../configs/database.config');
const Calibration = require('~models/calibration.model');

const data = './data/Google_calibration.json';
const infoData = fs.readFileSync(data);
const info = JSON.parse(infoData);

let ctr = 0;

console.log("Saving the calibration data...");
info.forEach(async (doc) => {
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
	.then((result) => {
		// console.log(result);
		ctr++;

		//Close database at the last item of calibration data
		if(ctr >= 12727)
			close();
	})
	.catch((err) => console.log(err));
});
