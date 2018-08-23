exports.up = function(knex, Promise) {
  return knex.schema.createTable('preference', function(table) {

    table.increments('id').primary();
    // table.integer('vote_id');
    // table.integer('option_id');
    table.integer('rank');

    table
    .foreign("vote_id")
    .references("id")
    .on("vote")
    .onDelete("cascade");

    table
    .foreign("option_id")
    .references("id")
    .on("option")
    .onDelete("cascade");

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('preference');
};
