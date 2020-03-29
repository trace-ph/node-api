'use strict';

const joi = require('@hapi/joi');

const deviceSchema = {
	POST: joi.object({
		device_id: joi.string().required()
	})
};

module.exports = deviceSchema;
