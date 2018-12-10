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
    create view if not exists view_average_rank_2019 as
    select avg(r.rank) as average_rank, r.team
    from 'rankings' as r, 'sets' as s
    where r.set_id = s.id
    and s.date_published > '2018-10-01 00:00'
    and s.date_published < '2019-07-30 00:00'
    group by team
    order by average_rank
  `
  return db.runSql(sql)
}

exports.down = function(db) {
  const sql = `
    drop view view_average_rank_2019
  `
  return db.runSql(sql)
}

exports._meta = {
  'version': 1,
}
