class AppError extends Error {
  constructor(message, originalError) {
    if (message instanceof Error) {
      originalError = message;
      message = originalError.message;
    }

    super(message);
    Error.captureStackTrace(this);

    this.originalError = originalError || null;
  }
}

module.exports = AppError;
