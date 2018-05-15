/**
 * Module Dependencies
 */
const compression = require('compression');
const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const debug = require('debug');

const config = require('../lib/config');
const mainRouter = require('./routes');

const AppError = require('./errors/AppError');
const ServiceError = require('./errors/ServiceError');

const loggerRequest = () => {
  const logger = debug('server:request');

  return morgan('combined', { stream: { write: msg => logger(msg) } });
};

const app = express();

// middlewares
app.use(compression());
app.use(loggerRequest());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use(mainRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
app.use((err, req, res, next) => {
  // we identify the database error by port binded to err object
  if (err.port === config.DB_CONNECTION_PORT) {
    err = new ServiceError(503, err);
  }

  // noop handled errors
  else if (err instanceof ServiceError || err.status === 404) {
  }

  // unhandle known errors
  else if (err instanceof AppError) {
    err = new ServiceError(
      503,
      'Service Unavailable',
      err.originalError || err
    );

    // TODO: Send error to error reporting services
  }

  // unhandle unknown errors
  else {
    err = new ServiceError(500, 'Internal Server Error', err);

    // TODO: Send error to error reporting services
  }

  const stack = (err.originalError || err).stack;

  // eslint-disable-next-line no-console
  console.error(stack);

  const payload = { message: err.message };
  if (app.get('env') === 'development') {
    payload['stack'] = stack;
  }

  res.status(err.status).send(payload);
});

module.exports = app;
