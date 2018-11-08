import { Searcher } from "./searcher"
import { SearchResults } from "./searchresults";
import { Rankings } from "./rankings";

const s = new Searcher()
const sr = new SearchResults()
const r = new Rankings()


s.search('nba power rankings', 50, 'm').then(
    (results) => {
        sr.loadRankings(results, r.loadFromSearchResult)
    },
    (err) => console.log("Error searching: " + err)
)