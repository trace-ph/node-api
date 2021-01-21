const express = require('express');
const swabReport = require('~validators/swab-report.validator');
const schemaValidator = require('~middlewares/schemaValidator');

// TODO: implement this properly
const swabReportController = (request, response) => {
  response.status(201).json({ success: true });
};
// const swabReportController = require('~controllers/swab-report.controller');


const router = express.Router();

router.post(
  '/',
  schemaValidator(swabReport.POST),
  swabReportController,
);

module.exports = router;
