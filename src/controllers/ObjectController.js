/**
 * Module Dependencies
 */
const moment = require('moment');
const Promise = require('bluebird');

const knex = require('../../lib/knex');

const ServiceError = require('../errors/ServiceError');
const ObjectError = require('../errors/ObjectError');

class ObjectController {
  /**
   * Handler for fetching object specified by key and optional value of timestamp.
   *
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static async getObject(req, res) {
    const { key } = req.params;
    const timestamp =
      req.query.timestamp && moment.unix(req.query.timestamp).isValid()
        ? moment.unix(req.query.timestamp).toDate()
        : moment().toDate();

    const obj = await knex('object')
      .where('key', key)
      .where('timestamp', '<=', timestamp)
      .orderBy('timestamp', 'DESC')
      .first();

    if (obj === undefined) {
      throw new ServiceError(400, ObjectError.NotFound(key));
    }

    res.send({ value: JSON.parse(obj.value) });
  }

  /**
   * Handler for creating new object.
   *
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static createObject(req, res) {
    const keys = Object.keys(req.body).filter(key => key !== 'timestamp');

    if (keys.length === 0) {
      throw new ServiceError(
        400,
        new ObjectError('Invalid request key-value data.')
      );
    }

    const timestamp = moment();

    Promise.map(
      keys,
      key =>
        knex('object')
          .insert({
            key,
            value: JSON.stringify(req.body[key]),
            timestamp: timestamp.toDate()
          })
          .returning('*'),
      { concurrency: 5 } // limit to 5
    ).then(() => {
      const payloads = keys.map(key => ({
        key,
        value: req.body[key],
        timestamp: timestamp.unix()
      }));

      res.send(payloads.length === 1 ? payloads[0] : payloads);
    });
  }
}

module.exports = ObjectController;
