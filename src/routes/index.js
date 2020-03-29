'use strict';

const DeviceRoute = require('./device.route');

const BASE_ROUTE = '/api';
module.exports = server => {
	server.use(BASE_ROUTE + '/device', DeviceRoute);
};
