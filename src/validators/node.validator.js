'use strict';

const joi = require('@hapi/joi');

const DEVICE_ID_REGEX = /(?:\w{2}(?::|$)){6}/;

const nodeSchema = {
	POST: joi.object({
		device_id: joi
			.string()
			.pattern(DEVICE_ID_REGEX)
			.required()
			.messages({
				'string.pattern.base': `device_id has an invalid format: "{#value}"`
			})
	}),
	PUT: joi.object({
		node_id: joi.string().required(),
		device_id: joi.string().required(),
		person_id: joi.string().required()
	}),
	GET: joi
		.object({
			node_id: joi.string(),
			device_id: joi.string().pattern(DEVICE_ID_REGEX),
			person_id: joi.string()
		})
		.or('node_id', 'device_id', 'person_id')
};

module.exports = nodeSchema;
