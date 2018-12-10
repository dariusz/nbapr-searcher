import * as Parsers from './parser'

export class ParserProvider {
  public getParser(url: string): Parsers.Parser {
    if (url.indexOf('nfl/') > 0 || url.indexOf('video/') > 0) {
      return null
    }

    if (url.indexOf('espn.com') > 0) {
      return new Parsers.ESPN()
    } else if (url.indexOf('nbcsports.com') > 0) {
      return new Parsers.NBCS()
    } else if (url.indexOf('cbssports.com') > 0) {
      return new Parsers.CBS()
    } else if (url.indexOf('sportingnews.com') > 0) {
      return new Parsers.SNews()
    } else if (url.indexOf('bleacherreport.com') > 0) {
      return new Parsers.BR()
    } else if (url.indexOf('nba.com/powerrankings/') > 0) {
      return new Parsers.NBA()
    } else if (url.indexOf('si.com') > 0) {
      return new Parsers.SI()
    } else if (url.indexOf('sports.yahoo.com') > 0) {
      return new Parsers.Yahoo()
    }

    console.log('Warning: No parser for URL - ' + url)
    return null
  }
}
