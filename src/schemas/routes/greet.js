const Joi = require('joi') 

const schemas = { 
    device_id: Joi.string().required()
}; 

module.exports = schemas;