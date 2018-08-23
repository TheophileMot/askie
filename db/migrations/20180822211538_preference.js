// jshint esversion: 6
exports.up = function(knex, Promise) {
  return knex.schema.createTable('preference', table => {

    table.increments('id').primary();
    table.integer('vote_id');
    table.integer('rank');

    table
    .foreign("vote_id")
    .references("id")
    .on("vote")
    .onDelete("cascade");

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('preference');
};
