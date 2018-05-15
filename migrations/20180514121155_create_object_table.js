exports.up = function(knex, Promise) {
  return knex.schema.createTable('object', function(table) {
    table.increments('id');
    table.string('key');
    table.binary('value');
    table.dateTime('timestamp', knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('object');
};
