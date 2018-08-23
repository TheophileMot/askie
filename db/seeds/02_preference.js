
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('preference').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('preference').insert({rank: '1'}),
        knex('preference').insert({rank: '4'}),
        knex('preference').insert({rank: '5'}),
        knex('preference').insert({rank: '6'})
      ]);
    });
};
