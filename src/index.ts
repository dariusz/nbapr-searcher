import { Parser, ParserManager } from "./parser"
let pm = new ParserManager()

pm.add(new Parser("espn.com"))
pm.add(new Parser("nbcsports.com"))
pm.add(new Parser("cbssports.com"))
pm.add(new Parser("sports.yahoo.com"))

function openResults (result, linkCallback) {
    if (result.links) {
        result.links.forEach(link => {
            if (pm.get(link.link)) {
                linkCallback(link.link)
            }
        })
    }
}

function openLink(link) {
    let r = require('request')

    console.log(link)
    // return true

    r(link, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            console.log(parseRankings(link, html))
        }
    })
    return false
}

function parseRankings(link, html) {
    let c = require('cheerio')
    let $ = c.load(html)

    // espn
    if (link.indexOf("espn.com") > 0) {
        $('b:contains(". "), strong:contains(". ")').each(function(i) {
            console.log(i + ": " + $(this).text().trim())    
        })
        return true
    }

    // nbc
    if (link.indexOf("nbcsports.com") > 0) {
        $('h3.story__title:contains("No.")').each(function(i){
            console.log(i + ": " + $(this).text().trim())
        })
        return true
    }

    // cbs
    if (link.indexOf("cbssports.com") > 0) {
        $('td.team span').each(function(i) {
            let j = i + 1;
            console.log(j + ": " + $(this).html().trim())
        })
        return true
    }

    // yahoo sports
    if (link.indexOf("sports.yahoo.com") > 0) {
        $('strong:contains(". ")').each(function(i){
            console.log("Yahoo " + (i+1) + ": " + $(this).text().trim())
        })
        return true
    }

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
            openResults(result, openLink)
            return true
        }
    })
}

search('nba power rankings', 20, 'w')