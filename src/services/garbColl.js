//Import configs to be able to connect to DATABASE:
require('../configs/database.config').config();

//Import Schema model (nodecontact db)
const NodeContacts = require('~models/node-contact.model');

//Import CRON and SHELL for Node.js
const cron = require('node-cron');
const shell = require('shelljs');



var date = new Date();
var older_date = new Date();
older_date.setDate(date.getDate() - 20);

cron.schedule("0 0 * * SUN", function(){

	NodeContacts.remove({ timestamp: {$lt : older_date } }, function(err) {
  		console.log("Deletion Complete!");

	});
});