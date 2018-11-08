import { ParserProvider } from "./parserprovider"
import { Parser } from "./parser"

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
}

export class Rankings {

    loadFromSearchResult(result, html: string): RankingSet {
        if (!result || !result.link) return null
        
        const pp = new ParserProvider()
        const p:Parser = pp.getParser(result.link)
        const r:Ranking[] = p.getRankings(html)
        if (r.length < 30) {
            console.log("Warning: Less than 30 results in URL: " + result.link)
            return null
        }

        const d:string = p.getDatetime(html)

        const rset = {
            rankings: r, 
            url: result.link,
            title: result.title,
            description: result.description,
            date_created: new Date().toISOString(),
            date_published: new Date(d).toISOString()
        }
  
        return rset
    }
}