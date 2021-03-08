//Import logger 
const logger = require('~logger');

//Import Schema model (nodecontact db)
const NodeContacts = require('~models/node-contact.model');

//Import CRON and SHELL for Node.js
const cron = require('node-cron');
const shell = require('shelljs');

//Set date to 3 weeks before current date
var date = new Date();
var older_date = new Date();
older_date.setDate(date.getDate() - 20);


function garbcoll() {

	//Cron scheduler function (running every 12AM of Sundays)
	cron.schedule("0 0 * * SUN", function(){

    	logger.info("Deleting datas...")
	NodeContacts.count({ timestamp: {$lt : older_date } }, function( err, count){


	NodeContacts.remove({ timestamp: {$lt : older_date } }, function(err) {
		if(err) {
			logger.error(err);
		}
  		logger.info(`Datas Successfully deleted: ${count}`);

	});
});
})

};


module.exports = {garbcoll};