"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const psiLib = require("psi");
const normalizeError_1 = require("./normalizeError");
function psi(url) {
    return new Promise((resolve, reject) => {
        psiLib(url)
            .then(data => {
            const usability = data.ruleGroups.USABILITY.score;
            const speed = data.ruleGroups.SPEED.score;
            resolve({ speed, usability });
        })
            .catch(err => {
            reject(normalizeError_1.normalizeError(err));
        });
    });
}
exports.psi = psi;
//# sourceMappingURL=psi.js.map