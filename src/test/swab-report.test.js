const swabReportController = require("~controllers/swab-report.controller");
const { notifyCloseContacts } = swabReportController;

const node_id = "A";		// Confirmed positive
// Set ref_date to 5 days from today at midnight
let ref_date = new Date();
ref_date.setDate(ref_date.getDate() - 5);
ref_date.setHours(24,0,0);
// Set result_date to today at midnight
let result_date = new Date();
result_date.setHours(24,0,0);

notifyCloseContacts(node_id, ref_date, result_date);
