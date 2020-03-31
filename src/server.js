const logger = require('~logger');
const server = require('./index');

const { API_PORT, API_URL } = process.env;

server.listen(API_PORT, () => {
	logger.info(`App running at ${API_PORT}`);
});

module.exports = server;
