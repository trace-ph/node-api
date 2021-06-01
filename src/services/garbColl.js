//Import logger
const logger = require('~logger');

//Import Schema models
const NodeContacts = require('~models/node-contact.model');
const NotifiedContacts = require('~models/notified-contact.model');
const SwabReports = require('~models/swab-report.model');

//Import CRON and SHELL for Node.js
const cron = require('node-cron');
const shell = require('shelljs');


function garbcoll() {
	logger.info("Garbage collection started...");

	//Cron scheduler function (running every 12AM of Sundays)
	cron.schedule("0 0 * * SUN", function(){
    	// logger.info("Deleting node contacts...");

		// Set date to 3 weeks before current date
		let older_date = new Date();
		older_date.setDate(older_date.getDate() - 20);
		NodeContacts.countDocuments({ timestamp: { $lt : older_date }}, function(err, count){
			// Remove node contacts older than 3 weeks
			NodeContacts.deleteMany({ timestamp: { $lt : older_date }}, function(err) {
				if(err) logger.error(err);

		  		logger.info(`Node contacts successfully deleted: ${count}`);
			});
		});
	});

	// Runs everyday at 1 AM
	// Removes swab report and notified contacts
	cron.schedule("0 1 * * *", function(){
		// logger.info("Deleting swab reports and notified contacts...");

		let date = new Date();
		// Remove swab reports older than today
		SwabReports.countDocuments({ created_at: { $lt : date }}, function(err, count){
			SwabReports.deleteMany({ created_at: { $lt : date }}, function(err) {
				if(err) logger.error(err);

		  		logger.info(`Swab reports successfully deleted: ${count}`);
			});
		});

		// Remove notified contacts older than 1 day
		NotifiedContacts.countDocuments({ created_at: { $lt : date }, notif: true }, function(err, count){
			NotifiedContacts.deleteMany({ created_at: { $lt : date }, notif: true }, function(err) {
				if(err) logger.error(err);

		  		logger.info(`Notified contacts successfully deleted: ${count}`);
			});
		});

		// Remove unnotified contacts older than 1 week
		let notifdate = new Date();
		notifdate.setDate(notifdate.getDate() - 7);
		NotifiedContacts.countDocuments({ created_at: { $lt : date }}, function(err, count){
			NotifiedContacts.deleteMany({ created_at: { $lt : date }}, function(err) {
				if(err) logger.error(err);

		  		logger.info(`Old notifications successfully deleted: ${count}`);
			});
		});
	});
}

module.exports = { garbcoll };

/*
Code Reference:
> How to read CRON syntax
	https://www.netiq.com/documentation/cloud-manager-2-5/ncm-reference/?page=/documentation/cloud-manager-2-5/ncm-reference/data/bexyssf.html
*/
