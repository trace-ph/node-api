'use strict';

const mongoose = require('mongoose');

const config = (opts = {}) => {
	const uri =
		process.env.DATABASE_CONNECTION || 'mongodb://localhost:27017/traceph';
	mongoose
		.connect(
			uri,
			Object.assign({ useNewUrlParser: true, useUnifiedTopology: true }, opts)
		)
		.then(
			() => console.log('Connection to database successful!'),
			err => console.log('Database error:', e.message)
		);
};

module.exports = {
	config
};
