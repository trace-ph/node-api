'use strict';
const path = require('path');
const packageJson = require('../package.json');

//TODO: Remove initial function
const serveHtml = (request, response) => {
  response.sendFile(path.resolve(__dirname, '../openapi/redoc.html'));
};

const serveOpenApiYaml = (request, response) => {
  response.sendFile(path.resolve(__dirname, '../openapi/openapi.yaml'));
};

module.exports = {
  serveHtml,
  serveOpenApiYaml
};
