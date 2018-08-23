// jshint esversion: 6
const faker = require("faker");

exports.seed = function(knex, Promise) {
  return Promise.all([
    knex.raw("ALTER SEQUENCE option_id_seq RESTART WITH 1"),
    knex('option')
    .del()
    .then(function () {
      return knex('option').insert([
        { poll_id: 1, name: faker.lorem.words()},
        { poll_id: 1, name: faker.lorem.words()},
        { poll_id: 1, name: faker.lorem.words()},
        { poll_id: 1, name: faker.lorem.words()},
        { poll_id: 1, name: faker.lorem.words()}
      ]);
    })
  ]);
};
