function openResults (result, linkCallback) {
    if (result.links) {
        result.links.forEach(link => {
            linkCallback(link.link)
        })
    }
}

function openLink(link) {
    let r = require('request')

    r (link, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            let c = require('cheerio')
            let $ = c.load(html)
            console.log($('title').html())
        }
    })

    return false
}

function search (term) {
    let s = require('google')
    s.resultsPerPage = 10
    s.timeSpan = 'w'

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

search('nba power rankings')