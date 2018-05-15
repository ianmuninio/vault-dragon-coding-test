/**
 * Module Dependencies
 */
const AppError = require('./AppError');

class ObjectError extends AppError {
  static NotFound(key) {
    return new AppError(`Object key "${key}" not found.`);
  }
}

module.exports = ObjectError;
