exports.up = function(knex, Promise) {
  return knex.schema.table("poll", table => {
    table.string('description');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropColumn("description");
};
