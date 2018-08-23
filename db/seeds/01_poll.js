exports.seed = function(knex, Promise) {
  return knex('poll').del()
    .then(function () {
      return Promise.all([
        knex('poll').insert({  
          creator_email: 'example@example.com',
          question: 'Is it working?',
          voting_url: 'https://www.google.com/',
          results_url: 'https://www.amazon.com/'
        }),

      ]);
    });
};
