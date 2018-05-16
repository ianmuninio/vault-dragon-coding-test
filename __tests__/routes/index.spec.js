const request = require('supertest');
const app = require('app');

describe('routes:object', () => {
  it('should response Not Found 404 for default route', () =>
    request(app)
      .get('/')
      .then(response => {
        expect(response.statusCode).toBe(404);
        expect(response.header['content-type']).toEqual(
          'application/json; charset=utf-8'
        );
        expect(response.body).toEqual({
          message: `Not Found`
        });
      }));

  it('should response Not Found 404 for invalid urls', () =>
    request(app)
      .get('/invalid')
      .then(response => {
        expect(response.statusCode).toBe(404);
        expect(response.header['content-type']).toEqual(
          'application/json; charset=utf-8'
        );
        expect(response.body).toEqual({
          message: `Not Found`
        });
      }));
});
