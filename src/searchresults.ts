import { ParserProvider } from "./parserprovider"
import { RankingSet } from "./rankings"

export class SearchResults {
    loadRankings (results, individualResultHandler) {

        let pp = new ParserProvider()
        results.forEach(result => {
            
            if (!result.link) return false
            let url = result.link
            let p = pp.getParser(url)
    
            // only get the HTML if there's a parser
            if (p) {
                this.getHtml(url).then(
                    (html) => {
                        let rs:RankingSet = individualResultHandler(result, html)
                        console.log(rs)
                    },
                    (error) => console.log("Error: " + error)
                )
            }
        })
    }
    
    getHtml(url: string): Promise<string> {
    
        let r = require('request')
    
        return new Promise ((resolve, reject) => {
            r(url, function (error, response, html) {
                if (!error && response.statusCode == 200) {
                    resolve(html)
                } else {
                    reject(error)
                }
            })
        })
    }
}