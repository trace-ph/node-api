const logger = require('~logger');
const server = require('./index');

const { API_URL, API_PORT } = process.env;


const httpServer = server.listen(API_PORT, () => {
  logger.info(`App running at ${API_PORT}`);
});

module.exports = httpServer;
