// jshint esversion: 6
exports.up = function(knex, Promise) {
  return knex.schema.createTable('option', function(table) {

    table.increments('id').primary();
    table.string('name');
    table.integer('preference_id');
    table.integer('poll_id');

    table
    .foreign("preference_id")
    .references("id")
    .on("preference")
    .onDelete("cascade");

    table
    .foreign("poll_id")
    .references("id")
    .on("poll")
    .onDelete("cascade");

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('preference');
};
