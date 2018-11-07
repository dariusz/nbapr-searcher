import { ParserProvider } from "./parserprovider"

export class SearchResults {
    load (results, individualResultHandler) {

        let pp = new ParserProvider()
        results.forEach(result => {
            
            if (!result.link) return false
            let url = result.link
            let p = pp.getParser(url)
    
            if (p) {
                this.getHtml(url).then(
                    (html) => {
                        individualResultHandler(result, html)
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