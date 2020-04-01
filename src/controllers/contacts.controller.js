'use strict';

const nodeContactModel = require('~models/node-contact.model');

const createContacts = (request, response) => {
  const contacts = request.body.contacts;

  nodeContactModel
    .create(contacts)
    .then(result => response.send(result))
    .catch(err => res.status(500).send(errorResponse(500, err.message)));
};

module.exports = {
  createContacts
};
