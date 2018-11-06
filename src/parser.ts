interface Ranking {
    rank: number
    team: string
}

abstract class Parser {

    urlSubstring: string
    createdDate: string
    html: string
    $: any
    
    constructor (urlSubstring: string) {
        this.urlSubstring = urlSubstring
    }

    validFor(url: string) {
        if (url && url.indexOf(this.urlSubstring) > 0) {
            return true
        }
        return false
    }

    loadHtml(url: string): Promise<boolean> {

        let r = require('request')
        console.log("Loading HTML from: " + url)
    
        return new Promise ((resolve, reject) => {
            r(url, function (error, response, html) {
                if (!error && response.statusCode == 200) {
                        
                    // if we're good, load the HTML and parse it
                    this.html = html
                    let c = require('cheerio')
                    this.$ = c.load(this.html)
                    resolve(true)
                }
                reject(false)
            })
        })
    }

    abstract getRankings(): Ranking[]
    abstract getDate(): string
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

export class ParserESPN extends Parser {

    constructor () {
        super("espn.com")
    }

    getDate(): string {
        return "01/01/2018"
    }

    getRankings(): Ranking[] {

        let r = { rank: 1, team: "GSW" }
        let ra = []
        ra.push(r)
        return ra

        this.$('b:contains(". "), strong:contains(". ")').each(function(i) {
            console.log(i + ": " + this.$(this).text().trim())    
        })
        // return true
    }
}