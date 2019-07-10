"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const base = 'https://ilearnsmarter.com';
const url = {
    home: base,
    a: `${base}/learning-meme`,
    b: `${base}/write-sentence`,
    c: `${base}/guess-word`,
    d: `${base}/choose-word`,
    f: `${base}/user`,
};
async function debug() {
    const result = await _1.testURL(url.c);
    console.log(result);
}
debug();
//# sourceMappingURL=debug.js.map