
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('vote').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('vote').insert({ poll_id: 1 })
      ]);
    });
};
