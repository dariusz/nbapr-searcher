import { Searcher } from "./searcher"
import { SearchResults } from "./searchresults";

const s = new Searcher()
const sr = new SearchResults()

s.search('nba power rankings', 50, 'm')
    .then(
        (results) => {
            sr.loadRankings(results)
        },
        (err) => {
            console.log("Error searching: " + err)
        }
    )