const express = require('express');
const deviceValidator = require('~validators/device.validator');
const schemaValidator = require('~middlewares/schemaValidator');
const authenticator = require('~middlewares/authenticator');
const deviceController = require('~controllers/device.controller');

const router = express.Router();

router.post('/', authenticator, schemaValidator(deviceValidator.POST), deviceController.greet);

module.exports = router;
