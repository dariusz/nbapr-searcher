'use strict'

var dbm
var type
var seed

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate
  type = dbm.dataType
  seed = seedLink
}

exports.up = function(db) {
  return db.createTable('sets', {
    columns: {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      url: 'string',
      parser: 'string',
      title: 'string',
      description: 'string',
      date_published: 'datetime',
      date_created: { type: 'datetime', defaultValue: new Date().toISOString() },
    },
    ifNotExists: true,
  })
}

exports.down = function(db) {
  return db.dropTable('sets', {
    ifExists: true,
  })
}

exports._meta = {
  'version': 1,
}
