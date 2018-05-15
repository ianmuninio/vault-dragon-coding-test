/**
 * Module Dependencies
 */
const config = require('./lib/config');

module.exports = {
  client: config.DB_CLIENT,
  connection: {
    host: config.DB_CONNECTION_HOST,
    port: config.DB_CONNECTION_PORT,
    user: config.DB_CONNECTION_USERNAME,
    password: config.DB_CONNECTION_PASSWORD,
    database: config.DB_CONNECTION_DATABASE
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
