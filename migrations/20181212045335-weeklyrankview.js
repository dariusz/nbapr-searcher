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
    create view view_weekly_rankings as
      select avg(r.rank) as rank, r.team as team,
      strftime('%W', s.date_published) as wk, strftime('%Y', s.date_published) as yr
    from rankings r, sets s
    where s.id = r.set_id
    group by r.team, wk, yr
    order by yr asc, wk asc, rank asc
  `
  return db.runSql(sql)
}

exports.down = function(db) {
  const sql = `
    drop view view_weekly_rankings
  `
  return db.runSql(sql)
}

exports._meta = {
  'version': 1,
}
