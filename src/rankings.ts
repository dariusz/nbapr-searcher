import { Parser } from './parser'
import { ParserProvider } from './parserprovider'

const knex = require('knex')(
  {
    client: 'sqlite3',
    connection: {
      filename: 'db/dev.db',
    },
  },
)

export interface IRanking {
    rank: number
    team: string
}

export interface IRankingSet {
    rankings: IRanking[]
    url: string
    title: string
    description: string
    date_published: string
    date_created: string
    parser: string
}

export class Rankings {
  public loadFromSearchResult(result, html: string): IRankingSet {
    if (!result || !result.link) { return null }

    const pp = new ParserProvider()
    const p: Parser = pp.getParser(result.link)
    const r: IRanking[] = p.getRankings(html)

    if (r.length !== 30) {
      console.log('Warning: Not 30 results in URL: ' + result.link)
      return null
    }

    const d: string = p.getDatetime(html)

    const rset = {
      date_created: new Date().toISOString(),
      date_published: new Date(d).toISOString(),
      description: result.description,
      parser: p.getName(),
      rankings: r,
      title: result.title,
      url: result.link,
    }

    return rset
  }

  public async save(set: IRankingSet) {
    const obj = {
      date_published: set.date_published,
      description: set.description,
      parser: set.parser,
      title: set.title,
      url: set.url,
    }

    const setId: number[] = await knex('sets').insert(obj)

    if (setId) {
      console.log('Created set ' + setId[0] + ': ' + obj.url)
    }

    set.rankings.forEach((rank) => {
      this.saveRanking(rank, setId[0])
    })
  }

  public async saveRanking(rank: IRanking, setId: number) {
    await knex('rankings').insert({
      rank: rank.rank,
      set_id: setId,
      team: rank.team,
    })
  }
}
