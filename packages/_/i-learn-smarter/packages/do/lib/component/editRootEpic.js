"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const rambdax_1 = require("rambdax");
const log_1 = require("log");
const string_fn_1 = require("string-fn");
const outputFileSync_1 = require("../_modules/outputFileSync");
const constants_1 = require("./../constants");
function editRootEpic(input) {
    const content = fs_1.readFileSync(input.rootEpicLocation).toString();
    const hasImport = content.includes(constants_1.IMPORT_EPICS_MARKER);
    const hasConnect = content.includes(constants_1.CONNECT_EPICS_MARKER);
    const ok = hasImport && hasConnect;
    if (!ok)
        return log_1.log({ ok, _: editRootEpic.name }, 'pattern');
    const epicName = string_fn_1.camelCase(`${input.name}.epic`);
    const importPath = `'../../${input.folderName}/epics/'`;
    const importEpicStatement = `import { ${epicName} } from ${importPath}`;
    const importEpic = `${constants_1.IMPORT_EPICS_MARKER}\n${importEpicStatement}`;
    const afterImport = rambdax_1.replace(constants_1.IMPORT_EPICS_MARKER, importEpic, content);
    const connectEpic = `${constants_1.CONNECT_EPICS_MARKER}\n  ${epicName},`;
    const newContent = rambdax_1.replace(constants_1.CONNECT_EPICS_MARKER, connectEpic, afterImport);
    outputFileSync_1.outputFileSync(input.rootEpicLocation, newContent);
}
exports.editRootEpic = editRootEpic;
//# sourceMappingURL=editRootEpic.js.map