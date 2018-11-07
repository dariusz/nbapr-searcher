import { Searcher } from "./searcher"
import { SearchResults } from "./searchresults";
import { Rankings } from "./rankings";

const s = new Searcher()
const sr = new SearchResults()
const r = new Rankings()

s.search('nba power rankings', 50, 'w')
    .then(
        (results) => sr.load(results, r.loadFromSearchResult),
        (err) => console.log("Error searching: " + err)
    )