//Import configs to be able to connect to DATABASE:
require('../configs/database.config').config();

//Import Schema model (nodecontact db)
const NodeContacts = require('~models/node-contact.model');

console.log("Deleting QR codes...");

//Import CRON and SHELL for Node.js
const cron = require('node-cron');
const shell = require('shelljs');



var d = new Date();
var ddate = new Date();
ddate.setDate(d.getDate() - 20);



cron.schedule("0 0 * * SUN", function(){

	NodeContacts.remove({ timestamp: {$lt : ddate } }, function(err) {
  		console.log("Successfully Deleted N datas");

	});
});