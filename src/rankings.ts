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

    loadFromSearchResult(result, html: string) {
        if (!result || !result.link) return null
        
        const pp = new ParserProvider()
        const p:Parser = pp.getParser(result.link)
        const r:Ranking[] = p.getRankings(html)

        const rset = {
            rankings: r, 
            url: result.link,
            title: result.title,
            description: result.description,
            date_created: new Date().toISOString(),
            date_published: ""
        }
  
        console.log(rset)
    }
}