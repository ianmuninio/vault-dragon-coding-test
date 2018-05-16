const request = require('supertest');
const app = require('app');

describe('routes:object', () => {
  it('should response GET method Bad Request 400 for non-existing keys', () =>
    request(app)
      .get('/object/test')
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.header['content-type']).toEqual(
          'application/json; charset=utf-8'
        );
        expect(response.body).toEqual({
          message: `Object key "test" not found.`
        });
      }));

  it('should response GET method for existing keys', () =>
    request(app)
      .get('/object/keya')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.header['content-type']).toEqual(
          'application/json; charset=utf-8'
        );
        expect(response.body).toEqual({ value: 'A-New' });
      }));

  it('should response POST method Bad Request 400 for data', () =>
    request(app)
      .post('/object')
      .send({})
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.header['content-type']).toEqual(
          'application/json; charset=utf-8'
        );
        expect(response.body).toEqual({
          message: 'Invalid request key-value data.'
        });
      }));

  it('should response POST method for 1 key', () =>
    request(app)
      .post('/object')
      .send({ sample: 'me' })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.header['content-type']).toEqual(
          'application/json; charset=utf-8'
        );
        expect(response.body).toMatchObject({
          key: 'sample',
          value: 'me'
        });
        expect(response.body).toHaveProperty('timestamp');
        expect(response.body.timestamp).not.toBeNull();
      }));

  it('should response POST method for multiple key', () =>
    request(app)
      .post('/object')
      .send({ sample2: 'a', sample3: 'b' })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.header['content-type']).toEqual(
          'application/json; charset=utf-8'
        );
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body).toMatchObject([
          { key: 'sample2', value: 'a' },
          { key: 'sample3', value: 'b' }
        ]);
        expect(response.body[0]).toHaveProperty('timestamp');
        expect(response.body[0].timestamp).not.toBeNull();
      }));
});
