import { Teams } from './team'
import { Ranking } from './rankings'

export abstract class Parser {
  constructor () { }

    abstract parseRankings(any): Ranking[]
    abstract parseDatetime(any): string
    abstract getName(): string

    getRankings (html): Ranking[] {
      if (html.length == 0) { return [] }

      let cheerio = require('cheerio')
      let $ = cheerio.load(html)
      return this.parseRankings($)
    }

    getDatetime (html): string {
      if (html.length == 0) { return '' }

      let cheerio = require('cheerio')
      let $ = cheerio.load(html)
      return this.parseDatetime($)
    }
}

export class ESPN extends Parser {
  parseRankings ($): Ranking[] {
    let rs = []; let tm = new Teams()
    $('b:contains(". "), strong:contains(". ")').each(function (i) {
      let t = $(this).text().trim()
      let r = { rank: i + 1, team: tm.guess(t) }
      rs.push(r)
    })
    return rs
  }

  parseDatetime ($): string {
    return $('meta[name="DC.date.issued"]').attr('content')
  }

  getName (): string {
    return 'espn'
  }
}

export class NBCS extends Parser {
  parseRankings ($): Ranking[] {
    let rs = []; let tm = new Teams()
    $('h3.story__title:contains("No.")').each(function (i) {
      let t = $(this).text().trim()
      let r = { rank: 30 - i, team: tm.guess(t) }
      rs.push(r)
    })
    return rs
  }

  parseDatetime ($): string {
    return $('meta[property="og:updated_time"]').attr('content')
  }

  getName (): string {
    return 'nbcsports'
  }
}

export class CBS extends Parser {
  parseRankings ($): Ranking[] {
    let rs = []; let tm = new Teams()
    $('td.team span').each(function (i) {
      let t = $(this).text().trim()
      let r = { rank: i + 1, team: tm.guess(t) }
      rs.push(r)
    })
    return rs
  }

  parseDatetime ($) {
    return $('meta[itemprop="datePublished"]').attr('content')
  }

  getName (): string {
    return 'cbs'
  }
}

export class SNews extends Parser {
  parseRankings ($): Ranking[] {
    let rs = []; let tm = new Teams(); let x = 0
    $('strong').each(function (i) {
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

  parseDatetime ($): string {
    return $('meta[property="article:published_time"]').attr('content')
  }

  getName (): string {
    return 'sportingnews'
  }
}

export class Yahoo extends Parser {
  parseRankings ($): Ranking[] {
    let rs = []; let tm = new Teams(); let x = 0
    $('strong:contains(". ")').each(function (i) {
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

  parseDatetime ($): string {
    return $('time[itemprop="datePublished"]').attr('datetime')
  }

  getName (): string {
    return 'yahoo'
  }
}

export class SI extends Parser {
  parseRankings ($): Ranking[] {
    let rs = []; let tm = new Teams(); let x = 30
    $('strong:contains(". "), strong:contains("Record")').each(function (i) {
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

  parseDatetime ($): string {
    return $('div.published-date').text()
  }

  getName (): string {
    return 'sportsillustrated'
  }
}

export class BR extends Parser {
  parseRankings ($): Ranking[] {
    let rs = []; let tm = new Teams(); let x = 30
    $('strong, h1:contains(". ")').each(function (i) {
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
  parseDatetime ($): string {
    return $('meta[name="pubdate"]').attr('content')
  }

  getName (): string {
    return 'bleacherreport'
  }
}

export class NBA extends Parser {
  parseRankings ($): Ranking[] {
    let rs = []; let tm = new Teams(); let x = 1
    $('.team-name a').each(function (i) {
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
  parseDatetime ($): string {
    return $('meta[name="publishDate"]').attr('content')
  }

  getName () : string {
    return 'nba.com'
  }
}
