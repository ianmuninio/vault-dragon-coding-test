const AppError = require('errors/AppError');
const ObjectError = require('errors/ObjectError');

describe('ObjectError', () => {
  it('should instanceof AppError', () => {
    const error = new ObjectError('test error');

    expect(error).toBeInstanceOf(AppError);
    expect(error).toBeInstanceOf(ObjectError);
  });

  it('should match the error message', () => {
    const error = new ObjectError('test error');

    expect(error.message).toEqual('test error');
  });

  it('should contains originalError', () => {
    const originalError = new Error('test');
    const error = new ObjectError('test error', originalError);

    expect(error.originalError).toEqual(originalError);
    expect(error.originalError.message).toEqual(originalError.message);
  });
});
