// Update with your config settings.
require('dotenv').config({ path: '../.env' });

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: process.env.CONN_STRING,
    migrations: {
      tableName: 'quizzity_migrations'
    }
  },

  staging: {
  },

  production: {
  }

};
