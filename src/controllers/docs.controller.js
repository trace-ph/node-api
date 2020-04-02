const path = require('path');

// TODO: Remove initial function
const serveHtml = (request, response) => {
  response.sendFile(path.resolve(__dirname, '../openapi/redoc.html'));
};

const serveOpenApiYaml = (request, response) => {
  response.sendFile(path.resolve(__dirname, '../openapi/openapi.yaml'));
};

module.exports = {
  serveHtml,
  serveOpenApiYaml,
};
