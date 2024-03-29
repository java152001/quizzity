/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("teams", function (table) {
        table.increments("id").primary();
        table.string("name", 255).notNullable();
        table.smallint("numberOfPlayers");
        table.smallint("score");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("teams");
};
