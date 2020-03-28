"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
function getUpdateURL(x) {
    return rambdax_1.head(x.split('#'));
}
exports.getUpdateURL = getUpdateURL;
