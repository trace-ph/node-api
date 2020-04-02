const express = require('express');
const deviceValidator = require('~validators/device.validator');
const schemaValidator = require('~middlewares/schemaValidator');
const deviceController = require('~controllers/device.controller');

const router = express.Router();

router.post('/', schemaValidator(deviceValidator.POST), deviceController.greet);

module.exports = router;
