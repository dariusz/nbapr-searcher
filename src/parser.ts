import { Teams } from "./team"
import { Ranking } from "./rankings"

export abstract class Parser {
    
    constructor () { }
    abstract parseRankings(any): Ranking[]
    abstract parseDatetime(any): string
    
    getRankings(html): Ranking[] {
        if (html.length == 0)
            return []

        let cheerio = require('cheerio')
        let $ = cheerio.load(html)
        return this.parseRankings($)
    }

    getDatetime(html): string {
        if (html.length == 0)
            return ""

        let cheerio = require('cheerio')
        let $ = cheerio.load(html)
        return this.parseDatetime($)
    }
}

export class ParserESPN extends Parser {
    parseRankings($): Ranking[] {
        let rs = [], tm = new Teams()
        $('b:contains(". "), strong:contains(". ")').each(function(i) {
            let t = $(this).text().trim()
            let r = { rank: i + 1, team: tm.guess(t) }
            rs.push(r)
        })
        return rs
    }

    parseDatetime($): string {
        return $('meta[name="DC.date.issued"]').attr("content")
    }
}

export class ParserNBCS extends Parser {
    parseRankings($): Ranking[] {
        let rs = [], tm = new Teams()
        $('h3.story__title:contains("No.")').each(function(i){
            let t = $(this).text().trim()
            let r = { rank: 30 - i, team: tm.guess(t) }
            rs.push(r)
        })
        return rs
    }

    parseDatetime($): string {
        return $('meta[property="og:updated_time"]').attr('content')
    }
}

export class ParserCBS extends Parser {
    parseRankings($): Ranking[] {
        let rs = [], tm = new Teams()
        $('td.team span').each(function(i) {
            let t = $(this).text().trim()
            let r = { rank: i + 1, team: tm.guess(t) }
            rs.push(r)
        })
        return rs
    }

    parseDatetime($) {
        return $('meta[itemprop="datePublished"]').attr('content')
    }
}

export class ParserSNews extends Parser {
    parseRankings($): Ranking[] {
        let rs = [], tm = new Teams(), x = 0
        $('strong').each(function(i) {
            let t = $(this).text().trim()
            t = tm.guess(t)
            if (t.length > 0) {
                x++
                let r = { rank: x, team: t }
                rs.push(r)
            }   
        })
        return rs
    }

    parseDatetime($): string {
        return $('meta[property="article:published_time"]').attr('content')
    }
}

export class ParserYahoo extends Parser {
    parseRankings($): Ranking[] {
        let rs = [], tm = new Teams(), x = 0
        $('strong:contains(". ")').each(function(i) {
            let t = $(this).text().trim()
            t = tm.guess(t)
            if (t.length > 0) {
                x++
                let r = { rank: x, team: t }
                rs.push(r)
            }   
        })
        return rs
    }

    parseDatetime($): string {
        return $('time[itemprop="datePublished"]').attr('datetime')
    }
}

export class ParserSI extends Parser {
    parseRankings($): Ranking[] {
        let rs = [], tm = new Teams(), x = 30
        $('strong:contains(". "), strong:contains("Record")').each(function(i) {
            let t = $(this).text().trim()
            t = tm.guess(t)
            if (t.length > 0) {
                let r = { rank: x, team: t }
                x--
                rs.push(r)
            }   
        })
        return rs
    }

    parseDatetime($): string {
        return $('div.published-date').text()
    }
}

export class ParserBR extends Parser {
    parseRankings($): Ranking[] {
        let rs = [], tm = new Teams(), x = 30
        $('strong, h1:contains(". ")').each(function(i) {
            let t = $(this).text().trim()
            t = tm.guess(t)
            if (t.length > 0) {
                let r = { rank: x, team: t }
                x--
                rs.push(r)
            }   
        })
        return rs
    }
    parseDatetime($): string {
        return $('meta[name="pubdate"]').attr('content')
    }
}

export class ParserNBA extends Parser {
    parseRankings($): Ranking[] {
        let rs = [], tm = new Teams(), x = 1
        $('.team-name a').each(function(i) {
            let t = $(this).text().trim()
            t = tm.guess(t)
            if (t.length > 0) {
                let r = { rank: x, team: t }
                x++
                rs.push(r)
            }   
        })
        return rs
    }
    parseDatetime($): string {
        return $('meta[name="publishDate"]').attr('content')
    } 
}
