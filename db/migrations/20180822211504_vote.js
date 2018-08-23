exports.up = function(knex, Promise) {
  return knex.schema.createTable('vote', function(table) {

    table.increments('id').primary();
    table.integer('poll_id').primary();

    table
    .foreign("poll_id")
    .references("id")
    .on("poll")
    .onDelete("cascade");

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('vote');
};
