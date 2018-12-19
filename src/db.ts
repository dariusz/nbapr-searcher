import * as Knex from 'knex'

export const dbc = Knex({
  client: 'sqlite3',
  connection: {
    filename: 'db/dev.db',
  }
})
