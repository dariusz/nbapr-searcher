"use strict";
exports.__esModule = true;
var Parser = /** @class */ (function () {
    function Parser(urlSubstring) {
        this.urlSubstring = urlSubstring;
    }
    Parser.prototype.validFor = function (url) {
        if (url && url.indexOf(this.urlSubstring) > 0) {
            return true;
        }
        return false;
    };
    return Parser;
}());
exports.Parser = Parser;
var ParserManager = /** @class */ (function () {
    function ParserManager() {
        this.parsers = [];
    }
    ParserManager.prototype.add = function (p) {
        this.parsers.push(p);
    };
    ParserManager.prototype.get = function (link) {
        for (var i = 0; i < this.parsers.length; i++) {
            var p = this.parsers[i];
            if (p.validFor(link)) {
                return p;
            }
        }
        return false;
    };
    return ParserManager;
}());
exports.ParserManager = ParserManager;
