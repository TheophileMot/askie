
exports.seed = function(knex, Promise) {
  return knex('friend_email').del()
    .then(function () {
      return Promise.all([
        knex('friend_email').insert({
          email: 'example@example.com'
        }),
      ]);
    });
};
