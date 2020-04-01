'use strict';

const express = require('express');
const nodeValidator = require('~validators/node.validator');
const schemaValidator = require('~middlewares/schemaValidator');
const nodeController = require('~controllers/node.controller');

const router = express.Router();

router.post('/', schemaValidator(nodeValidator.POST), nodeController.save);

router.get(
	'/',
	schemaValidator(nodeValidator.GET, 'query'),
	nodeController.find
);

module.exports = router;
