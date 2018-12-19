import * as Parsers from './parser'

export class ParserProvider {
  public getParser(url: string): Parsers.Parser {
    if (url.indexOf('nfl/') > 0 || url.indexOf('video/') > 0) {
      return null
    }

    if (url.indexOf('espn.com/') > 0) {
      return new Parsers.ESPN()
    }

    if (url.indexOf('nbcsports.com/') > 0) {
      return new Parsers.NBCS()
    }

    if (url.indexOf('cbssports.com/') > 0) {
      return new Parsers.CBS()
    }

    if (url.indexOf('bleacherreport.com/') > 0) {
      return new Parsers.BR()
    }

    if (url.indexOf('nba.com/powerrankings/') > 0) {
      return new Parsers.NBA()
    }

    if (url.indexOf('si.com/') > 0) {
      return new Parsers.SI()
    }

    if (url.indexOf('sports.yahoo.com/') > 0) {
      return new Parsers.Yahoo()
    }

    if (url.indexOf('thescore.com/') > 0) {
      return new Parsers.TheScore()
    }

    if (url.indexOf('scout.com/') > 0) {
      return new Parsers.Scout()
    }

    console.log('Warning: No parser for URL - ' + url)
    return null
  }
}
