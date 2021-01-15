'use strict';

require('dotenv-safe').config();

const { API_PORT } = process.env;
const express = require('express');
const bodyParser = require("body-parser");

const { mobile, ...routes } = require('./routes');
const schemas = require('./schemas')
const middlewares = require('./middlewares')

const app = express();

// Routes
app.use(bodyParser.json())
app.post('/greet', middlewares.validator(schemas.routes.greet), mobile.greet);

app.listen(API_PORT, () => {
    console.log('App running at', API_PORT)
});
