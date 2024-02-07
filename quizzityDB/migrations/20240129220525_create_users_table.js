/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('users', function(table){
            table.increments('id').primary();
            table.string('firstName', 255).notNullable();
            table.string('lastName', 255).notNullable();
            table.string('email', 255).notNullable().unique({indexName: 'user_unique_email', deferrable: 'immediate'});
            table.string('password', 255).notNullable();
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTable('users');
};
