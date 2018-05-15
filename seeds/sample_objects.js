/**
 * Module Dependencies
 */
const moment = require('moment');

exports.seed = function(knex, Promise) {
  // deletes all existing entries
  return knex('object')
    .del()
    .then(() =>
      // inserts new seed entries
      knex('object').insert([
        {
          id: 1,
          key: 'keyA',
          value: JSON.stringify('A'),
          timestamp: moment.unix(1494741600).toDate()
        },
        {
          id: 2,
          key: 'keyB',
          value: JSON.stringify('B'),
          timestamp: moment.unix(1494741900).toDate()
        },
        {
          id: 3,
          key: 'keyA',
          value: JSON.stringify('A-New'),
          timestamp: moment.unix(1494742200).toDate()
        },
        {
          id: 4,
          key: 'keyB',
          value: JSON.stringify({ nested: 'nested_value-B', num: 123 }),
          timestamp: moment.unix(1494742500).toDate()
        }
      ])
    );
};
