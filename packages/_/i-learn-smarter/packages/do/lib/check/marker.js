"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const log_1 = require("log");
const rambdax_1 = require("rambdax");
function shortenPath(filePath) {
    // tslint:disable-next-line
    return rambdax_1.takeLast(3, filePath.split('/')).join('/');
}
function markerCheck(input) {
    if (!fs_1.existsSync(input.location)) {
        const message = `Missing file '${input.location}'`;
        log_1.log(message, 'error');
        return false;
    }
    let flag = true;
    const content = fs_1.readFileSync(input.location);
    const filePath = shortenPath(input.location);
    input.markers.forEach(singleMarker => {
        if (!content.includes(singleMarker)) {
            flag = false;
            const message = `Missing marker '${singleMarker}' in ${filePath}`;
            log_1.log(message, 'error');
        }
    });
    if (flag) {
        log_1.log(`Initial check '${filePath}'`, 'success');
    }
    return true;
}
exports.markerCheck = markerCheck;
//# sourceMappingURL=marker.js.map