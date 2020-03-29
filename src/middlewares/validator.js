'use strict';

const Joi = require('joi'); 

const validate = (schema, property) => { 
  return (req, res, next) => { 

    const { error } = Joi.validate(req.body, schema); 
    const valid = error == null; 

    if (!valid) { 
      const { details } = error; 
      const message = details.map(i => i.message).join(',');

      console.log("Error: ", message); 
      res.status(422).json({ error: message }) 
    }

    next(); 
  }
} 

module.exports = validate;
