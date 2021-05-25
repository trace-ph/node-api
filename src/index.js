require('dotenv-safe').config();
require('./configs/database.config').config();

const express = require('express');
const bodyParser = require('body-parser');
const Routes = require('./routes');
const { morganLogger } = require('./middlewares/morganLogger');

const app = express();

app.use(bodyParser.json());
app.use(morganLogger);

// Load routes
Routes(app);

module.exports = app;
