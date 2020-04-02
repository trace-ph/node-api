'use strict';

const DocsRoute = require('./docs.route');
const DeviceRoute = require('./device.route');
const NodeRoute = require('./node.route');
const NodeContactsRoute = require('./node-contacts.route');

const BASE_ROUTE = '/api';
module.exports = server => {
  server.use(BASE_ROUTE + '/device', DeviceRoute);
  server.use(BASE_ROUTE + '/node', NodeRoute);
  server.use(BASE_ROUTE + '/node_contacts', NodeContactsRoute);
  
  // !DO NOT REMOVE OR EDIT BEYOND THIS LINE!
  server.use('/docs', DocsRoute);
	server.get('/healthcheck', (req, res, next) => {
		res.status(200).send('OK');
		return next();
	});
};
