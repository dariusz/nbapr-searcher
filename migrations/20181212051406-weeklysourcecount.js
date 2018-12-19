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
  const sql = `
    create view view_weekly_source_count as
    select count(id) as sources, strftime('%W', s.date_published) as wk, strftime('%Y', s.date_published) as yr
    from sets s
    group by wk, yr
    order by yr desc, wk desc
  `
  return db.runSql(sql)
}

exports.down = function(db) {
  const sql = `
    drop view view_weekly_source_count
  `
  return db.runSql(sql)
}

exports._meta = {
  'version': 1,
}
