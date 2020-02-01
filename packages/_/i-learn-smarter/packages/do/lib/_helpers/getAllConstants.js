"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const rambdax_1 = require("rambdax");
function getAllConstants(filePath) {
    const fileContent = fs_1.readFileSync(filePath).toString();
    const matched = rambdax_1.match(/export\sconst\s.{2,30}=/gmu, fileContent);
    return matched.map(singleMatch => {
        const replaced = rambdax_1.replace('export const', '', singleMatch);
        return rambdax_1.init(replaced).trim();
    });
}
exports.getAllConstants = getAllConstants;
//# sourceMappingURL=getAllConstants.js.map