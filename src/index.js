'use strict';

require('dotenv-safe').config();
require('./configs/database.config').config();

const { API_PORT, API_URL } = process.env;
const express = require('express');
const bodyParser = require('body-parser');
const Routes = require('./routes');
const { morganLogger } = require('./middlewares/morganLogger');

const app = express();

app.use(bodyParser.json());
app.use(morganLogger);

app.listen(API_PORT, () => {
	console.log('App running at', API_PORT);
});

// Load routes
Routes(app);

module.exports = {
	app
};
