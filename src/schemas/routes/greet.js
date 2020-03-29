const Joi = require('@hapi/joi') 

const schemas = { 
    device_id: Joi.string().required()
}; 

module.exports = schemas;