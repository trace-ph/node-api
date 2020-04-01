'use strict';

const nodeContactModel = require('~models/node-contact.model');
const errorResponse = require('~models/error-response.model');

const createContacts = (request, response) => {
  const contacts = request.body.contacts;

  nodeContactModel
    .create(
      contacts.map(contact => {
        return {
          ...contact,

          // Sort node pairs
          node_pairs: contact.node_pairs.sort(),

          // Get ip from the server
          ip:
            request.header('x-forwarded-for') ||
            request.connection.remoteAddress
        };
      })
    )
    .then(result => response.send(result))
    .catch(err => response.status(500).send(errorResponse(500, err.message)));
};

module.exports = {
  createContacts
};
