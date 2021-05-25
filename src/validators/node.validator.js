/* eslint no-useless-escape: 0 */

const joi = require('@hapi/joi');

const deviceIdSchema = joi.alternatives(
  joi.string().guid(),
  joi.string().hex(),
);

const nodeSchema = {
  POST: joi
    .object({
      device_id: deviceIdSchema.required(),
    })
    .messages({
      'string.pattern.base': '{#key} has an invalid format: "{#value}"',
    }),
  PUT: joi
    .object({
      node_id: joi
        .string()
        .max(15)
        .required(),
      device_id: deviceIdSchema.required(),
    })
    .messages({
      'string.pattern.base': '{#key} has an invalid format: "{#value}"',
    }),
  GET: joi
    .object({
      node_id: joi.string().max(15),
      device_id: deviceIdSchema,
    })
    .or('node_id', 'device_id')
    .messages({
      'string.pattern.base': '{#key} has an invalid format: "{#value}"',
    }),
};

module.exports = nodeSchema;
