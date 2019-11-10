"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const parse_1 = require("./parse");
const debug_1 = require("../_modules/debug");
function getURL(word) {
    const encoded = encodeURIComponent(word);
    const base = 'https://www.openthesaurus.de/synonyme/search';
    const url = `${base}?q=${encoded}&format=application/json`;
    return url;
}
async function german(word) {
    try {
        const url = getURL(word);
        const result = await axios_1.default.get(url);
        return parse_1.parse(word, result.data);
    }
    catch (e) {
        console.log(e);
        return [];
    }
}
exports.german = german;
if (debug_1.debug()) {
    german('%C3%BCberzeugt').then(result => {
        console.log(result);
    });
}
//# sourceMappingURL=index.js.map