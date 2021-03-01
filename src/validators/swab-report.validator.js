// eslint-disable-next-line import/no-unresolved
const joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const nodeSchema = {
  POST: joi
    .object({
      node_id: joi
        .string()
        .max(15)
        .required(),

      patient_info: joi
        .object({
          test_result: joi
            .string()
            .valid('positive', 'negative')
            .required(),

          test_result_date: joi
            .date()
            .format([
              'YYYY-MM-DD',
            ])
            .required(),

          symptom: joi
            .string()
            .valid('symptomatic', 'asymptomatic', 'not-applicable')
            .required(),

          reference_date: joi
            .date()
            .format([
              'YYYY-MM-DD',
            ])
            .required(),
        })
        .required(),
    })
    .messages({
      'string.pattern.base': '{#key} has an invalid format: "{#value}"',
    }),
};

module.exports = nodeSchema;
