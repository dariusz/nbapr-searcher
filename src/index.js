function search(term, resultsCallback) {
    var s = require('google');
    s.resultsPerPage = 10;
    s.timeSpan = 'w';
    s(term, function (err, result) {
        if (err) {
            console.log(err);
            return false;
        }
        if (result) {
            resultsCallback(result);
            return true;
        }
    });
    return false;
}
function openResults(result) {
    if (result.links) {
        result.links.forEach(function (link) {
            openLink(link.link);
        });
    }
}
function openLink(link) {
    var r = require('request');
    r(link, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var c = require('cheerio');
            var $ = c.load(html);
            console.log($('title').html());
        }
    });
    return false;
}
search('nba power rankings', openResults);
