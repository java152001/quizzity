/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('quizzes', function(table){
            table.increments('id').primary();
            table.string('title', 255).notNullable();
            table.datetime('quizStart', { precision: 4 }).notNullable();
            table.integer('joinID').notNullable();
            table.integer('userID').references('id').inTable('users');
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTable('quizzes');
};
