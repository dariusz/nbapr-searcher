import { Parser, ParserSI, ParserNBA, ParserESPN, ParserCBS, ParserBR, ParserSNews, ParserNBCS, ParserYahoo } from "./parser"

export class ParserProvider {
    getParser(url: string): Parser {

        if (
            url.indexOf("nfl/") > 0 ||
            url.indexOf("video/") > 0
        ) {
            return null
        }

        if (url.indexOf("espn.com") > 0) {
            return new ParserESPN()
        } else if (url.indexOf("nbcsports.com") > 0) {
            return new ParserNBCS()
        } else if (url.indexOf("cbssports.com") > 0) {
            return new ParserCBS()
        } else if (url.indexOf("sportingnews.com") > 0) {
            return new ParserSNews()
        } else if (url.indexOf("bleacherreport.com") > 0) {
            return new ParserBR()
        } else if (url.indexOf("nba.com/powerrankings/") > 0) {
            return new ParserNBA()
        } else if (url.indexOf("si.com") > 0) {
            return new ParserSI()
        } else if (url.indexOf("sports.yahoo.com") > 0) {
            return new ParserYahoo()
        }

        console.log("Warning: No parser for URL - " + url)
        return null
    }
}