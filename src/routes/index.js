'use strict';

const DeviceRoute = require('./device.route');
const DocsRoute = require('./docs.route');

const BASE_ROUTE = '/api';
module.exports = server => {
  server.use('/docs', DocsRoute);
  server.use(BASE_ROUTE + '/device', DeviceRoute);
};
