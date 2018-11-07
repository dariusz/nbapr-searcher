import { Parser, ParserESPN, ParserCBS, ParserBR, ParserSNews, ParserNBCS } from "./parser"

export class ParserProvider {
    getParser(url: string): Parser {

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
        }

        return null
    }
}