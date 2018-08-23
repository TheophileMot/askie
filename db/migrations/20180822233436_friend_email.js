exports.up = function(knex, Promise) {
  return knex.schema.createTable('friend_email', function(table) {

    table.increments('id').primary();
    table.integer('poll_id');
    table.string('email');

    table
    .foreign("poll_id")
    .references("id")
    .on("poll")
    .onDelete("cascade");

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('friend_email');
};
