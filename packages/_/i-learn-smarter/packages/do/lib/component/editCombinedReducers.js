"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const rambdax_1 = require("rambdax");
const outputFileSync_1 = require("../_modules/outputFileSync");
const constants_1 = require("../constants");
function editCombinedReducers(input) {
    if (!input.store)
        return;
    const content = fs_1.readFileSync(input.combinedReducersLocation).toString();
    const importPath = `'../${input.folderName}/reducers'`;
    const importEpicStatement = `import { ${input.storeName} } from ${importPath}`;
    const importEpic = `${constants_1.IMPORT_STORES_MARKER}\n${importEpicStatement}`;
    const afterImport = rambdax_1.replace(constants_1.IMPORT_STORES_MARKER, importEpic, content);
    const connectStore = `${constants_1.CONNECT_STORES_MARKER}\n  ${input.storeName},`;
    const newContent = rambdax_1.replace(constants_1.CONNECT_STORES_MARKER, connectStore, afterImport);
    outputFileSync_1.outputFileSync(input.combinedReducersLocation, newContent);
    return newContent;
}
exports.editCombinedReducers = editCombinedReducers;
//# sourceMappingURL=editCombinedReducers.js.map