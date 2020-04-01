const morgan = require('morgan');
const logger = require('~logger');

module.exports.morganLogger = morgan(
	':remote-addr - :method :url :status :response-time ms - :res[content-length]',
	{ stream: logger.stream }
);
