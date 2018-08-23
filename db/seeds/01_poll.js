const faker = require("faker");

exports.seed = function(knex, Promise) {
  return knex('poll').del()
    .then(function () {
      return Promise.all([
        knex('poll').insert({
          creator_email: faker.internet.email(),
          question: faker.lorem.sentence().slice(0, -1) + '?',
          voting_url: faker.internet.url(),
          results_url: faker.internet.url()
        }),

      ]);
    });
};
