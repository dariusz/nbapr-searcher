import { ParserProvider } from './parserprovider'
import { IRankingSet, Rankings } from './rankings'
import { Request } from './request'

export class SearchResults {
  public loadRankings(results) {
    const pp = new ParserProvider()
    results.forEach((result) => {
      if (!result.link) { return false }

      const url = result.link
      const parser = pp.getParser(url)

      // only get the HTML if there's a valid parser
      if (parser) {
        const r = new Request()
        r.getHtml(url).then(
          (html) => {
            const rankings: Rankings = new Rankings()
            const rankingset: IRankingSet = rankings.loadFromSearchResult(result, html)
            if (rankingset) {
              rankings.save(rankingset).catch((error) => {
                console.log(error)
              })
            }
          },
          (error) => console.log(error),
        )
      }
    })
  }
}
