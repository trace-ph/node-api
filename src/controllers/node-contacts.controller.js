const nodeContactModel = require('~models/node-contact.model');
const errorResponse = require('~models/error-response.model');

const createContacts = (request, response) => {
  const { contacts } = request.body;

  nodeContactModel
    .create(
      contacts.map((contact) => ({
        ...contact,

        node_pairs: [contact.source_node_id, contact.node_pair].sort(),
        // Get ip from the server
        // ip:
        //   request.header('x-forwarded-for') || request.connection.remoteAddress,
      })),
    )
    .then((result) => response.send(result))
    .catch((err) => response.status(500).send(errorResponse(500, err.message)));
};

module.exports = {
  createContacts,
};
