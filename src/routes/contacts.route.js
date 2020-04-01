'use strict';

const express = require('express');
const deviceValidator = require('~validators/device.validator');
const schemaValidator = require('~middlewares/schemaValidator');
const contactsController = require('~controllers/contacts.controller');

const router = express.Router();

router.post(
  '/',
  schemaValidator(deviceValidator.POST),
  contactsController.createContacts
);

module.exports = router;
