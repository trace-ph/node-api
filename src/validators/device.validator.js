// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/no-unresolved
const joi = require('@hapi/joi');

const deviceSchema = {
  POST: joi.object({
    device_id: joi.string().required(),
  }),
};

module.exports = deviceSchema;
