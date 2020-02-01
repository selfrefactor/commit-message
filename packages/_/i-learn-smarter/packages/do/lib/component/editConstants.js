"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const rambdax_1 = require("rambdax");
const string_fn_1 = require("string-fn");
const log_1 = require("log");
const getAllConstants_1 = require("../_helpers/getAllConstants");
const outputFileSync_1 = require("../_modules/outputFileSync");
const constants_1 = require("./../constants");
function editConstants(input) {
    const allConstants = getAllConstants_1.getAllConstants(input.constantsLocation);
    const alreadyExists = allConstants.includes(input.constantKey);
    if (alreadyExists) {
        log_1.log({ alreadyExists, _: editConstants.name }, 'pattern');
        return;
    }
    const content = fs_1.readFileSync(input.constantsLocation).toString();
    const ok = content.includes(constants_1.INJECT_COMPONENT_MARKER);
    if (!ok) {
        log_1.log({ ok, _: editConstants.name }, 'pattern');
        return;
    }
    const injection = `${constants_1.INJECT_COMPONENT_MARKER}
// ${string_fn_1.constantCase(input.name)}
export const ${input.constantKey} = '${input.constantValue}'`;
    const newContent = rambdax_1.replace(constants_1.INJECT_COMPONENT_MARKER, injection, content);
    outputFileSync_1.outputFileSync(input.constantsLocation, newContent);
}
exports.editConstants = editConstants;
//# sourceMappingURL=editConstants.js.map