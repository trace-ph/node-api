/* eslint no-useless-escape: 0 */

const joi = require('@hapi/joi');

const MAC_ADDRESS_REGEX = /^(?:[0-9a-fA-F]{2}\:){5}[0-9a-fA-F]{2}$/;

const nodeSchema = {
  POST: joi
    .object({
      device_id: joi
        .string()
        .pattern(MAC_ADDRESS_REGEX)
        .required(),
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
      device_id: joi
        .string()
        .pattern(MAC_ADDRESS_REGEX)
        .required(),
    })
    .messages({
      'string.pattern.base': '{#key} has an invalid format: "{#value}"',
    }),
  GET: joi
    .object({
      node_id: joi.string().max(15),
      device_id: joi.string().pattern(MAC_ADDRESS_REGEX),
    })
    .or('node_id', 'device_id')
    .messages({
      'string.pattern.base': '{#key} has an invalid format: "{#value}"',
    }),
};

module.exports = nodeSchema;
