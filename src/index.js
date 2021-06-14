require('dotenv-safe').config();
require('./configs/database.config').config();
require('./services/garbColl').garbcoll();

const express = require('express');
const bodyParser = require('body-parser');
const promBundle = require("express-prom-bundle");

const Routes = require('./routes');
const { morganLogger } = require('./middlewares/morganLogger');

const metricsMiddleware = promBundle({includeMethod: true, includePath: true });
const app = express();

app.use(bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  },
}));
app.use(morganLogger);
app.use(metricsMiddleware);

// Load routes
Routes(app);

module.exports = app;
