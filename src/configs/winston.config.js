const { createLogger, format, transports } = require('winston');

const { printf, colorize: colorizer } = format;

const defaultFormat = (info) => colorizer().colorize(
  info.level,
  `[${info.level.toUpperCase()}] ${new Date().toISOString()} - ${info.message}`,
);

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'debug',
    }),
  ],
  exitOnError: false,
  format: printf(defaultFormat),
});

logger.stream = {
  write(message) {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  },
};

module.exports = logger;
