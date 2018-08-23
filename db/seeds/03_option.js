exports.seed = function(knex, Promise) {
  return knex('option').del()
    .then(function () {
      return Promise.all([
        knex('option').insert({
          name: 'Yes'
        }),
        knex('option').insert({
          name: 'No'
        })
      ]);
    });
};
