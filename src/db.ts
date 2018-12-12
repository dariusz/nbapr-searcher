export const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: 'db/dev.db',
  }
})
