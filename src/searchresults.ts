import { ParserProvider } from "./parserprovider"
import { RankingSet, Rankings } from "./rankings"
import { Request } from "./request"

export class SearchResults {
    loadRankings (results) {

        let pp = new ParserProvider()
        results.forEach(result => {
            
            if (!result.link) return false
            let url = result.link
            let p = pp.getParser(url)
    
            // only get the HTML if there's a valid parser
            if (p) {
                let r = new Request()
                r.getHtml(url).then(
                    (html) => {
                        let r: Rankings = new Rankings()
                        let rs: RankingSet = r.loadFromSearchResult(result, html)
                        console.log(rs)
                    },
                    (error) => console.log("Error: " + error)
                )
            }
        })
    }
}