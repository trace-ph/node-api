'use strict';

const logger = require('~logger');

const _validationOptions = {
	abortEarly: false, // abort after the last validation error
	allowUnknown: true, // allow unknown keys that will be ignored
	stripUnknown: true // remove unknown keys from the validated data
};

// property: body (default), query, param
const validate = (schema, property = 'body') => (req, res, next) => {
	const { error } = schema.validate(req[property], _validationOptions);
	const valid = error == null;

	if (!valid) {
		const { details } = error;
		const message = details.map(i => i.message).join(',');

		logger.error(message);
		return res.status(422).json({ error: message });
	}

	next();
};

module.exports = validate;
