'use strict';

const uri =
  process.env.DATABASE_CONNECTION || 'mongodb://localhost:27017/traceph';
const mongoose = require('mongoose');

const connection = mongoose.createConnection(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

connection.on('connected', () =>
  console.log('Connection to database successful!')
);
connection.on('error', e => console.log('Database error:', e.message));

const deviceSchema = require('./devices')(connection);
const nodeContactSchema = require('./node-contacts')(connection);
const nodeSchema = require('./nodes')(connection);

module.exports = {
  deviceSchema,
  nodeContactSchema,
  nodeSchema
};
