import { ParserManager, ParserESPN } from "./parser"

let pm = new ParserManager()

function openResults (result, linkCallback) {
    if (result.links) {
        result.links.forEach(link => {
            if (pm.get(link.link)) {
                linkCallback(link.link)
            }
        })
    }
}

function parseRankings(link) {

    // espn
    if (link.indexOf("espn.com") > 0) {
        let p = new ParserESPN()
        let loaded = p.loadHtml(link)
        if (loaded) {
            console.log(p.getRankings())
        }
    }

    return

    return "Not parsed: " + link
}

function search (term, resultsPerPage, timeSpan) {
    let s = require('google')
    s.resultsPerPage = resultsPerPage
    s.timeSpan = timeSpan

    s(term, function (err, result) {
        if (err) {
            console.log(err)
            return false
        }

        if (result) {
            openResults(result, parseRankings)
            return true
        }
    })
}

search('nba power rankings', 20, 'w')