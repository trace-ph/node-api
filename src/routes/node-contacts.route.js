const express = require('express');
const nodeContacts = require('~validators/node-contacts.validator');
const schemaValidator = require('~middlewares/schemaValidator');
const nodeContactsController = require('~controllers/node-contacts.controller');

const router = express.Router();

router.post(
  '/',
  schemaValidator(nodeContacts.POST),
  nodeContactsController.createContacts,
);

module.exports = router;
