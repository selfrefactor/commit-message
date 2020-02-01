"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const log_1 = require("log");
const rambdax_1 = require("rambdax");
const outputFileSync_1 = require("../_modules/outputFileSync");
const constants_1 = require("../constants");
/**
 * Adds the new epic to the index epic in the current namespace
 * i.e. adds barEpic in foo/epics/index.ts file
 */
function connectEpic(input) {
    const content = fs_extra_1.readFileSync(input.indexEpicLocation).toString();
    const [, relativePathRaw] = input.epicLocation.split('epics/');
    const hasImport = content.includes(constants_1.IMPORT_EPICS_MARKER);
    const hasConnect = content.includes(constants_1.CONNECT_EPICS_MARKER);
    if (!hasImport || !hasConnect) {
        log_1.log({ hasImport, hasConnect }, 'pattern');
        return;
    }
    /**
     * Same effect is dropLast(3) but with `replace` is
     * easier to see what is meant
     */
    const relativePath = rambdax_1.replace('.ts', '', relativePathRaw);
    const from_ = `from './${relativePath}'`;
    const import_ = `import { ${input.epicName} }`;
    const withImport = rambdax_1.inject(`\n${import_} ${from_}`, constants_1.IMPORT_EPICS_MARKER, content);
    const newContent = rambdax_1.inject(`\n  ${input.epicName},`, constants_1.CONNECT_EPICS_MARKER, withImport);
    outputFileSync_1.outputFileSync(input.indexEpicLocation, newContent);
    return newContent;
}
exports.connectEpic = connectEpic;
//# sourceMappingURL=connectEpic.js.map