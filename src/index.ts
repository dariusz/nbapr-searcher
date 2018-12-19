import { Searcher } from './searcher'
import { SearchResults } from './searchresults'

const searcher = new Searcher()
const searchresults = new SearchResults()

searcher.search('nba power rankings site:si.com', 50, 'y')
  .then(
    (results) => {
      searchresults.loadRankings(results)
    },
    (err) => {
      console.log('Error searching: ' + err)
    }
  )
