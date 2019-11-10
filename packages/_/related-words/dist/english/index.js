"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env = require("env-fn");
const axios_1 = require("axios");
const comparator_1 = require("../_modules/comparator");
const rambdax_1 = require("rambdax");
const debug_1 = require("../_modules/debug");
if (debug_1.debug()) {
    env('special');
}
function getURL(word) {
    // [http://developer.wordnik.com/docs.html#!/word/getRelatedWords_get_4](INFO)
    return `http://api.wordnik.com:80/v4/word.json/${word}/relatedWords?useCanonical=false&limitPerRelationshipType=10&api_key=${process.env.WORDNIK_API}`;
}
function getURLx(word) {
    return `https://words.bighugelabs.com/api/2/${process.env.BIGHUGELABS_API}/${word}/format=json`;
}
async function englishx(word) {
    try {
        const URL = getURL(word);
        const { data } = await axios_1.default.get(URL);
        const filtered = data.filter(singleSet => singleSet.relationshipType === 'same-context' ||
            singleSet.relationshipType === 'synonym');
        if (filtered.length === 0) {
            return [];
        }
        const similarList = rambdax_1.flatten(rambdax_1.pluck('words', filtered));
        if (similarList.length === 0) {
            return [];
        }
        return similarList;
    }
    catch (e) {
        console.log(e);
        return [];
    }
}
exports.englishx = englishx;
async function englishy(word) {
    try {
        const URL = getURLx(word);
        const { data } = await axios_1.default.get(URL);
        const splitted = data.trim().split('\n');
        const mapped = splitted.map(x => rambdax_1.last(x.split('|')));
        const filtered = mapped.filter((x) => rambdax_1.head(x) === rambdax_1.head(x).toLowerCase());
        return rambdax_1.uniq(filtered);
    }
    catch (e) {
        console.log(e);
        return [];
    }
}
exports.englishy = englishy;
async function english(word) {
    try {
        const promised = [englishx(word), englishy(word)];
        const result = await Promise.all(promised);
        const uniqResult = rambdax_1.uniq(rambdax_1.flatten(result));
        return rambdax_1.sort(comparator_1.comparator, uniqResult);
    }
    catch (e) {
        console.log(e);
        return [];
    }
}
exports.english = english;
if (debug_1.debug()) {
    english('loser').then(result => {
        console.log(result);
    });
}
//# sourceMappingURL=index.js.map