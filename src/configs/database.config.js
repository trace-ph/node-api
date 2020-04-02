const mongoose = require('mongoose');
const logger = require('~logger');

const { DB_CONN, DB_NAME } = process.env;

const getConnectionUrl = (forTest = false) => {
  const host = `${DB_CONN || 'mongodb://localhost:27017'}`.replace(/\/$/, '');
  const dbName = DB_NAME || 'traceph';
  if (forTest) {
    return `${host}/test-${dbName}`;
  }
  return `${host}/${dbName}`;
};

const config = (opts = {}) => {
  const uri = getConnectionUrl(false);
  mongoose
    .connect(
      uri,
      { ...opts, useNewUrlParser: true, useUnifiedTopology: true },
    )
    .then(() => logger.info('Connection to database successful!'))
    .catch((err) => logger.error(`Database error: ${err.message}`));
};

module.exports = {
  config,
  getConnectionUrl,
};
