// jshint esversion: 6
exports.up = function(knex, Promise) {
  return knex.schema.createTable('option', function(table) {

    table.increments('id').primary();
    table.string('name');
    table.integer('poll_id');


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
