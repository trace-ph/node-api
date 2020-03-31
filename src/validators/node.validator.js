'use strict';

const joi = require('@hapi/joi');

const MAC_ADDRESS_REGEX = /^(?:[0-9a-fA-F]{2}\:){5}[0-9a-fA-F]{2}$/;
const UUID_REGEX = /^[0-9a-fA-F]{8}\-(?:(?:[0-9a-fA-F]{4}\-){3})[0-9a-fA-F]{12}$/;

const nodeSchema = {
	POST: joi
		.object({
			device_id: joi
				.string()
				.pattern(MAC_ADDRESS_REGEX)
				.required()
		})
		.messages({
			'string.pattern.base': `{#key} has an invalid format: "{#value}"`
		}),
	PUT: joi
		.object({
			node_id: joi
				.string()
				.pattern(UUID_REGEX)
				.required(),
			device_id: joi
				.string()
				.pattern(MAC_ADDRESS_REGEX)
				.required(),
			person_id: joi
				.string()
				.pattern(UUID_REGEX)
				.required()
		})
		.messages({
			'string.pattern.base': `{#key} has an invalid format: "{#value}"`
		}),
	GET: joi
		.object({
			node_id: joi.string().pattern(UUID_REGEX),
			device_id: joi.string().pattern(MAC_ADDRESS_REGEX),
			person_id: joi.string().pattern(UUID_REGEX)
		})
		.or('node_id', 'device_id', 'person_id')
		.messages({
			'string.pattern.base': `{#key} has an invalid format: "{#value}"`
		})
};

module.exports = nodeSchema;
