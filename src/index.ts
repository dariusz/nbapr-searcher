import { Searcher } from './searcher'
import { SearchResults } from './searchresults'

const searcher = new Searcher()
const searchresults = new SearchResults()

searcher.search('nba power rankings', 30, 'w')
  .then(
    (results) => {
      searchresults.loadRankings(results)
    },
    (err) => {
      console.log('Error searching: ' + err)
    },
  )
