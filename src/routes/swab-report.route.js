const express = require('express');
const swabReport = require('~validators/swab-report.validator');
const schemaValidator = require('~middlewares/schemaValidator');
const swabReportController = require('~controllers/swab-report.controller');

const router = express.Router();


router.post(
	'/',
	schemaValidator(swabReport.POST),
	swabReportController.swabReport,
);

module.exports = router;
