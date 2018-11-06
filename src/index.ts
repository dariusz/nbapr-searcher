import { ParserManager, ParserESPN } from "./parser"

let pm = new ParserManager()

function openResults (result, linkCallback) {
    if (result.links) {
        result.links.forEach(link => {
            linkCallback(link.link)
        })
    }
}

function parseRankings(link) {

    if (!link) return false

    console.log("Parsing: " + link)

    // espn
    if (link.indexOf("espn.com") > 0) {
        let p = new ParserESPN()
        p.loadHtml(link).then(
            () => console.log(p.getRankings()),
            () => console.log("Error: Could not load HTML for " + link)
        )
    }

    return false
}

function search (term, resultsPerPage, timeSpan) {
    let s = require('google')
    s.resultsPerPage = resultsPerPage
    s.timeSpan = timeSpan

    console.log("Searching: " + term)

    s(term, function (err, result) {
        if (err) {
            console.log("Error: " + err)
        }

        if (result) {
            console.log("Results: " + result.links.length)
            openResults(result, parseRankings)
        }
    })
}

search('nba power rankings', 20, 'w')