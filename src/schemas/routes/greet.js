const Joi = require('@hapi/joi');

const devicSchema = {
	POST: Joi.object({
		device_id: Joi.string().required()
	})
};

module.exports = devicSchema;
