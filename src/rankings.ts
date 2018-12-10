import { ParserProvider } from "./parserprovider"
import { Parser } from "./parser"

let knex = require('knex')(
    {
        client: 'sqlite3',
        connection: {
            filename: "db/dev.db"
        }
    }
);

export interface Ranking {
    rank: number
    team: string
}

export interface RankingSet {
    rankings: Ranking[]
    url: string
    title: string
    description: string
    date_published: string
    date_created: string
    parser: string
}

export class Rankings {

    loadFromSearchResult(result, html: string): RankingSet {
        if (!result || !result.link) return null
        
        const pp = new ParserProvider()
        const p:Parser = pp.getParser(result.link)
        const r:Ranking[] = p.getRankings(html)
        if (r.length !== 30) {
            console.log("Warning: Not 30 results in URL: " + result.link)
            return null
        }

        const d:string = p.getDatetime(html)

        const rset = {
            rankings: r, 
            url: result.link,
            title: result.title,
            description: result.description,
            date_created: new Date().toISOString(),
            date_published: new Date(d).toISOString(),
            parser: p.getName()
        }
  
        return rset
    }

    async save(set: RankingSet) {
        const obj = {
            url: set.url,
            title: set.title,
            parser: set.parser,
            description: set.description,
            date_published: set.date_published
        }
    
        let set_id: number[] = await knex('sets').insert(obj)
    
        if (set_id) {
            console.log('Created set ' + set_id[0] + ': ' + obj.url)
        }
    
        set.rankings.forEach(rank => {
           this.saveRanking(rank, set_id[0])
        })
    }

    async saveRanking (rank: Ranking, set_id: number) {
        await knex('rankings').insert({
            rank: rank.rank,
            set_id: set_id,
            team: rank.team
        })
    }
}