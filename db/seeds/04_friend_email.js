const faker = require("faker");

exports.seed = function(knex, Promise) {
  return Promise.all([
    knex.raw("ALTER SEQUENCE friend_email_id_seq RESTART WITH 1"),
    knex('friend_email')
    .del()
    .then(function () {
      return knex('friend_email').insert([
          { email: faker.internet.email() }
      ]);
    })
  ]);
};
