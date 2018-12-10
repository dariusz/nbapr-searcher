export class Searcher {
  public search(term: string, resultsPerPage: number, timeSpan: string): Promise<any> {
    const s = require('google')
    s.resultsPerPage = resultsPerPage
    s.timeSpan = timeSpan

    return new Promise((resolve, reject) => {
      s(term, (err, result) => {
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
