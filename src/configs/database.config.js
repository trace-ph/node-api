'use strict';

const mongoose = require('mongoose');
const logger = require('~logger');

const config = (opts = {}) => {
	const uri =
		process.env.DATABASE_CONNECTION || 'mongodb://localhost:27017/traceph';
	mongoose
		.connect(
			uri,
			Object.assign({ useNewUrlParser: true, useUnifiedTopology: true }, opts)
		)
		.then(() => logger.info('Connection to database successful!'))
		.catch(err => logger.error(`Database error: ${err.message}`));
};

module.exports = {
	config
};
