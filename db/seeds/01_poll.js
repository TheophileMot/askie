// jshint esversion: 6
const faker = require("faker");

randstr = () => ('' + Math.random()).slice(2);

exports.seed = function(knex, Promise) {
  return Promise.all([
    knex.raw("ALTER SEQUENCE poll_id_seq RESTART WITH 1"),
    knex('poll')
    .del()
    .then(function () {
      return knex('poll').insert(
        {
          creator_email:  faker.internet.email(),
          question:       faker.lorem.sentence().slice(0, -1) + '?',
          voting_url:     randstr(),
          results_url:    randstr()
        }
      );

    })
  ]);
};
