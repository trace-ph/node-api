'use strict';

const joi = require('@hapi/joi');

const nodeSchema = {
  POST: joi
    .object({
      contacts: joi.array().items(
        joi.object({
          type: joi
            .string()
            .valid('direct-bluetooth', 'direct-network', 'indirect', 'manual')
            .required(),

          timestamp: joi
            .date()
            .iso()
            .required(),

          source_node_id: joi
            .string()
            .pattern(UUID_REGEX)
            .required(),

          node_pairs: joi
            .array()
            .items(joi.string().guid())
            .required(),

          location: joi
            .object({
              type: joi
                .string()
                .valid('Point')
                .required(),

              coordinates: joi
                .array()
                .items(joi.number().required())
                .required()
            })
            .required()
        })
      )
    })
    .messages({
      'string.pattern.base': `{#key} has an invalid format: "{#value}"`
    })
};

module.exports = nodeSchema;
