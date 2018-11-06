"use strict";
exports.__esModule = true;
var parser_1 = require("./parser");
var pm = new parser_1.ParserManager();
pm.add(new parser_1.Parser("espn.com"));
pm.add(new parser_1.Parser("nbcsports.com"));
pm.add(new parser_1.Parser("cbssports.com"));
pm.add(new parser_1.Parser("sports.yahoo.com"));
function openResults(result, linkCallback) {
    if (result.links) {
        result.links.forEach(function (link) {
            if (pm.get(link.link)) {
                linkCallback(link.link);
            }
        });
    }
}
function openLink(link) {
    var r = require('request');
    console.log(link);
    // return true
    r(link, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            console.log(parseRankings(link, html));
        }
    });
    return false;
}
function parseRankings(link, html) {
    var c = require('cheerio');
    var $ = c.load(html);
    // espn
    if (link.indexOf("espn.com") > 0) {
        $('b:contains(". "), strong:contains(". ")').each(function (i) {
            console.log(i + ": " + $(this).text().trim());
        });
        return true;
    }
    // nbc
    if (link.indexOf("nbcsports.com") > 0) {
        $('h3.story__title:contains("No.")').each(function (i) {
            console.log(i + ": " + $(this).text().trim());
        });
        return true;
    }
    // cbs
    if (link.indexOf("cbssports.com") > 0) {
        $('td.team span').each(function (i) {
            var j = i + 1;
            console.log(j + ": " + $(this).html().trim());
        });
        return true;
    }
    // yahoo sports
    if (link.indexOf("sports.yahoo.com") > 0) {
        $('strong:contains(". ")').each(function (i) {
            console.log("Yahoo " + (i + 1) + ": " + $(this).text().trim());
        });
        return true;
    }
    return "Not parsed: " + link;
}
function search(term, resultsPerPage, timeSpan) {
    var s = require('google');
    s.resultsPerPage = resultsPerPage;
    s.timeSpan = timeSpan;
    s(term, function (err, result) {
        if (err) {
            console.log(err);
            return false;
        }
        if (result) {
            openResults(result, openLink);
            return true;
        }
    });
}
search('nba power rankings', 20, 'w');
