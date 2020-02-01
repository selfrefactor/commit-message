"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const string_fn_1 = require("string-fn");
const log_1 = require("log");
const rambdax_1 = require("rambdax");
const outputFileSync_1 = require("../_modules/outputFileSync");
/**
 * Add `constantName` after the respective marker, i.e. below `// FOO`
 */
function editConstants(input) {
    const content = fs_extra_1.readFileSync(input.constantsLocation).toString();
    const marker = `// ${string_fn_1.constantCase(input.folder)}`;
    const statement = `export const ${input.constantName} = '${input.constantValue}'`;
    const includeStatement = content.includes(statement);
    const includeMarker = content.includes(marker);
    if (includeStatement || !includeMarker) {
        log_1.log({ includeStatement, includeMarker }, 'pattern');
        return;
    }
    const injection = `${marker}\n${statement}`;
    const newContent = rambdax_1.replace(marker, injection, content);
    outputFileSync_1.outputFileSync(input.constantsLocation, newContent);
}
exports.editConstants = editConstants;
//# sourceMappingURL=editConstants.js.map