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
let create = 0;
let update = 0;

console.log("Saving the calibration data...");
info.forEach(async (doc) => {
	Calibration.exists({ ' model': doc[' model'] }, (err, exist) => {
		if(!exist){
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
				create++;

				//Close database at the last item of calibration data
				if(ctr >= 12727){
					console.log("Created ", create, "logs and updated ", update);
					close();
				}
			})
			.catch((err) => console.log(err));

		} else {
			// Update the data
			Calibration.updateOne({ ' model': doc[' model'] }, {
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
				update++;

				//Close database at the last item of calibration data
				if(ctr >= 12727){
					console.log("Created ", create, "logs and updated ", update);
					close();
				}
			})
			.catch((err) => console.log(err));
		}
	})
	// console.log(doc);
});
