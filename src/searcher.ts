export class Searcher {
    search (term: string, resultsPerPage: number, timeSpan: string): Promise<any> {

        let s = require('google')
        s.resultsPerPage = resultsPerPage
        s.timeSpan = timeSpan

        return new Promise ((resolve, reject) => {
            s(term, function (err, result) {
                if (err) {
                    reject(err)
                }
                if (result) {
                    resolve(result.links)
                }
            })
        })
    }
}