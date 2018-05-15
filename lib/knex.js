/**
 * Module Dependencies
 */
const knex = require('knex');

const config = require('./config');

module.exports = knex({
  client: config.DB_CLIENT,
  connection: {
    host: config.DB_CONNECTION_HOST,
    port: config.DB_CONNECTION_PORT,
    user: config.DB_CONNECTION_USERNAME,
    password: config.DB_CONNECTION_PASSWORD,
    database: config.DB_CONNECTION_DATABASE
  }
});
