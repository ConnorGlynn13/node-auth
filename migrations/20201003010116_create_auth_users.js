
exports.up = function(knex) {
    return knex.schema.createTable('auth_users', (table) => {
        table.increments('id')
        table.string('email')
        table.string('password')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('auth_users')
};
