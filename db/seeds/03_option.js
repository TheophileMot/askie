const faker = require("faker");

exports.seed = function(knex, Promise) {
  return Promise.all([
    knex.raw("ALTER SEQUENCE option_id_seq RESTART WITH 1"),
    knex('option')
    .del()
    .then(function () {
      return knex('option').insert([
        { name: faker.lorem.words() },
        { name: faker.lorem.words() },
        { name: faker.lorem.words() },
        { name: faker.lorem.words() },
        { name: faker.lorem.words() }
        // { name: 'Yes'},
        // { name: 'No' }
      ]);
    })
  ]);
};
