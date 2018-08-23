// jshint esversion: 6
exports.up = function(knex, Promise) {
  return knex.schema.createTable('poll', function (table) {

    table.increments('id').primary();

    table.string('creator_email');

    table.string('question');

    table.string('voting_url');

    table.string('results_url');

    table.timestamp();

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('poll');
};
