/**
 * Module Dependencies
 */
const AppError = require('./AppError');

class ServiceError extends AppError {
  constructor(status, message, originalError) {
    super(message, originalError);

    this.status = status;
  }
}

module.exports = ServiceError;
