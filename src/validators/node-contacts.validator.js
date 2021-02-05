// eslint-disable-next-line import/no-unresolved
const joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

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
            .timestamp()
            .format([
              'YYYY-MM-DDTHH:mm:ss',
              'YYYY-MM-DDTHH:mm:ss.SSS',
              'YYYY-MM-DD HH:mm:ss',
              'YYYY-MM-DD HH:mm:ss.SSS',
              'YYYY-MM-DD HH:mm:ssZ',
              'YYYY-MM-DD HH:mm:ss.SSSZ',
            ])
            .required(),

          source_node_id: joi
            .string()
            .max(15)
            .required(),

          node_pair: joi
            .string()
            .max(15)
            .required(),

          rssi: joi
            .number()
            .required(),

          txPower: joi
            .number()
            .required(),

          // location: joi
          //   .object({
          //     type: joi
          //       .string()
          //       .valid('Point')
          //       .required(),
		  //
          //     coordinates: joi
          //       .array()
          //       .items(joi.number().required())
          //       .required(),
          //   })
          //   .required(),
        }),
      ),
    })
    .messages({
      'string.pattern.base': '{#key} has an invalid format: "{#value}"',
    }),
};

module.exports = nodeSchema;
