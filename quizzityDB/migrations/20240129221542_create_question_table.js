/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('questions', function(table) {
            table.increments('id').primary();
            table.enu('type', ['Single_Entry', 'Multi_Entry', 'Multiple_Choice'])
            table.text('questionText').notNullable;
            table.string('questionAnswer', 255).notNullable();
            table.integer('roundID').references('id').inTable('rounds')
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTable('questions');
};
