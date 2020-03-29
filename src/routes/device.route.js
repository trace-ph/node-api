'use strict';

const express = require('express');
const schemas = require('../schemas');
const middlewares = require('../middlewares');
const deviceController = require('../controllers/device.controller');

const router = express.Router();

router.post(
	'/',
	middlewares.validator(schemas.routes.greet.POST),
	deviceController.greet
);

module.exports = router;
