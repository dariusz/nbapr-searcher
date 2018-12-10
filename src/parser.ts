import { IRanking } from './rankings'
import { Teams } from './team'

export abstract class Parser {
    public abstract parseRankings($: any): IRanking[]
    public abstract parseDatetime($: any): string
    public abstract getName(): string

    public getRankings(html): IRanking[] {
      if (html.length === 0) { return [] }

      const cheerio = require('cheerio')
      const $ = cheerio.load(html)
      return this.parseRankings($)
    }

    public getDatetime(html): string {
      if (html.length === 0) { return '' }

      const cheerio = require('cheerio')
      const $ = cheerio.load(html)
      return this.parseDatetime($)
    }
}

export class ESPN extends Parser {
  public parseRankings($): IRanking[] {
    const rs = []
    const tm = new Teams()
    $('b:contains(". "), strong:contains(". ")').each(function(i) {
      const t = $(this).text().trim()
      const r = { rank: i + 1, team: tm.guess(t) }
      rs.push(r)
    })
    return rs
  }

  public parseDatetime($): string {
    return $('meta[name="DC.date.issued"]').attr('content')
  }

  public getName(): string {
    return 'espn'
  }
}

export class NBCS extends Parser {
  public parseRankings($): IRanking[] {
    const rs = []
    const tm = new Teams()
    $('h3.story__title:contains("No.")').each(function(i) {
      const t = $(this).text().trim()
      const r = { rank: 30 - i, team: tm.guess(t) }
      rs.push(r)
    })
    return rs
  }

  public parseDatetime($): string {
    return $('meta[property="og:updated_time"]').attr('content')
  }

  public getName(): string {
    return 'nbcsports'
  }
}

export class CBS extends Parser {
  public parseRankings($): IRanking[] {
    const rs = []
    const tm = new Teams()
    $('td.team span').each(function(i) {
      const t = $(this).text().trim()
      const r = { rank: i + 1, team: tm.guess(t) }
      rs.push(r)
    })
    return rs
  }

  public parseDatetime($) {
    return $('meta[itemprop="datePublished"]').attr('content')
  }

  public getName(): string {
    return 'cbs'
  }
}

export class SNews extends Parser {
  public parseRankings($): IRanking[] {
    const rs = []
    const tm = new Teams(); let x = 0
    $('strong').each(function(i) {
      const t = $(this).text().trim()
      t = tm.guess(t)
      if (t.length > 0) {
        x++
        const r = { rank: x, team: t }
        rs.push(r)
      }
    })
    return rs
  }

  public parseDatetime($): string {
    return $('meta[property="article:published_time"]').attr('content')
  }

  public getName(): string {
    return 'sportingnews'
  }
}

export class Yahoo extends Parser {
  public parseRankings($): IRanking[] {
    const rs = []
    const tm = new Teams(); let x = 0
    $('strong:contains(". ")').each(function(i) {
      const t = $(this).text().trim()
      t = tm.guess(t)
      if (t.length > 0) {
        x++
        const r = { rank: x, team: t }
        rs.push(r)
      }
    })
    return rs
  }

  public parseDatetime($): string {
    return $('time[itemprop="datePublished"]').attr('datetime')
  }

  public getName(): string {
    return 'yahoo'
  }
}

export class SI extends Parser {
  public parseRankings($): IRanking[] {
    const rs = []
    const tm = new Teams(); let x = 30
    $('strong:contains(". "), strong:contains("Record")').each(function(i) {
      const t = $(this).text().trim()
      t = tm.guess(t)
      if (t.length > 0) {
        const r = { rank: x, team: t }
        x--
        rs.push(r)
      }
    })
    return rs
  }

  public parseDatetime($): string {
    return $('div.published-date').text()
  }

  public getName(): string {
    return 'sportsillustrated'
  }
}

export class BR extends Parser {
  public parseRankings($): IRanking[] {
    const rs = []
    const tm = new Teams(); let x = 30
    $('strong, h1:contains(". ")').each(function(i) {
      const t = $(this).text().trim()
      t = tm.guess(t)
      if (t.length > 0) {
        const r = { rank: x, team: t }
        x--
        rs.push(r)
      }
    })
    return rs
  }
  public parseDatetime($): string {
    return $('meta[name="pubdate"]').attr('content')
  }

  public getName(): string {
    return 'bleacherreport'
  }
}

export class NBA extends Parser {
  public parseRankings($): IRanking[] {
    const rs = []
    const tm = new Teams(); let x = 1
    $('.team-name a').each(function(i) {
      const t = $(this).text().trim()
      t = tm.guess(t)
      if (t.length > 0) {
        const r = { rank: x, team: t }
        x++
        rs.push(r)
      }
    })
    return rs
  }
  public parseDatetime($): string {
    return $('meta[name="publishDate"]').attr('content')
  }

  public getName(): string {
    return 'nba.com'
  }
}
