const faker = require("faker");

exports.seed = function(knex, Promise) {
  return Promise.all([
    knex.raw("ALTER SEQUENCE preference_id_seq RESTART WITH 1"),
    knex('preference')
    .del()
    .then(function () {
      return knex('preference').insert([
          { rank: faker.random.number() },
          { rank: faker.random.number() },
          { rank: faker.random.number() },
          { rank: faker.random.number() },
      ]);
    })
  ]);
};
