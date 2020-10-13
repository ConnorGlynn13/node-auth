
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('auth_users').del()
    .then(function () {
      // Inserts seed entries
      return knex('auth_users').insert([
        {email: 'admin', password: 'admin'},
        {email: 'test', password: 'test'},
        {email: 'connor', password: 'connor'},
      ]);
    });
};
