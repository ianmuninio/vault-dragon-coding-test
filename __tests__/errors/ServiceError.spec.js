const AppError = require('errors/AppError');
const ServiceError = require('errors/ServiceError');

describe('ServiceError', () => {
  it('should instanceof AppError', () => {
    const error = new ServiceError(400, 'test error');

    expect(error).toBeInstanceOf(AppError);
    expect(error).toBeInstanceOf(ServiceError);
  });

  it('should match the status message', () => {
    const error = new ServiceError(500, 'test error');

    expect(error.status).toEqual(500);
  });

  it('should match the error message', () => {
    const error = new ServiceError(500, 'test error');

    expect(error.message).toEqual('test error');
  });

  it('should contains originalError', () => {
    const originalError = new Error('test');
    const error = new ServiceError(404, 'test error', originalError);

    expect(error.originalError).toEqual(originalError);
    expect(error.originalError.message).toEqual(originalError.message);
  });
});
