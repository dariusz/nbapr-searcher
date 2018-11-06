export class Parser {

    urlSubstring: string
    
    constructor (urlSubstring: string) {
        this.urlSubstring = urlSubstring
    }

    validFor(url: string) {
        if (url && url.indexOf(this.urlSubstring) > 0) {
            return true
        }
        return false
    }

    parse(url: string) {
        return false
    }

    getRankings() {
        return false
    }

    getDate() {
        return false
    }
}

export class ParserManager {

    parsers: Parser[]

    constructor() {
        this.parsers = []
    }
    
    add(p: Parser) {
        this.parsers.push(p)
    }

    get(link: string) {
        for (let i = 0; i < this.parsers.length; i++) {
            let p = this.parsers[i]
            if (p.validFor(link)) {
                return p
            }
        }
        return false
    }
}