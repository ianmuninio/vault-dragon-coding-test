const AppError = require('errors/AppError');

describe('AppError', () => {
  it('should instanceof AppError', () => {
    const error = new AppError('test error');

    expect(error).toBeInstanceOf(AppError);
  });

  it('should match the error message', () => {
    const error = new AppError('test error');

    expect(error.message).toEqual('test error');
  });

  it('should contains originalError', () => {
    const originalError = new Error('test');
    const error = new AppError('test error', originalError);

    expect(error.originalError).toEqual(originalError);
    expect(error.originalError.message).toEqual(originalError.message);
  });
});
