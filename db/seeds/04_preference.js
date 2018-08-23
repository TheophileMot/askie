// jshint esversion: 6
const faker = require("faker");

exports.seed = function(knex, Promise) {
  return Promise.all([
    knex.raw("ALTER SEQUENCE preference_id_seq RESTART WITH 1"),
    knex('preference')
    .del()
    .then(function () {
      return knex('preference').insert([
          {
            vote_id:    1,
            rank:       faker.random.number({min:1, max:5}),
            option_id:  1
          },
          {
            vote_id:    1,
            rank:       faker.random.number({min:1, max:5}),
            option_id:  2
          },
          {
            vote_id:    1,
            rank:       faker.random.number({min:1, max:5}),
            option_id:  3
          },
          {
            vote_id:    1,
            rank:       faker.random.number({min:1, max:5}),
            option_id:  4
          },
          {
            vote_id:    1,
            rank:       faker.random.number({min:1, max:5}),
            option_id:  5
          },
      ]);
    })
  ]);
};
