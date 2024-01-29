/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('rounds', function(table) {
            table.increments('id').primary();
            table.string('title', 255).notNullable();
            table.text('description');
            table.smallint('roundNumber');
            table.integer('quizID').references('id').inTable('quizzes');
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTable('rounds');
};
