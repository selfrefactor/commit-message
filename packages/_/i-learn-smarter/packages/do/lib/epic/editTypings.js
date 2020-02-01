"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const log_1 = require("log");
const rambdax_1 = require("rambdax");
const outputFileSync_1 = require("../_modules/outputFileSync");
const actionTypings_1 = require("../_templates/actionTypings");
const constantTypings_1 = require("../_templates/constantTypings");
const constants_1 = require("./../constants");
/**
 * Adds constant-like type and action interface
 */
function editTypings(input) {
    const content = fs_extra_1.readFileSync(input.typingsLocation).toString();
    const hasConstants = content.includes(constants_1.CONSTANTS_MARKER);
    const hasInterfaces = content.includes(constants_1.ACTION_INTERFACES_MARKER);
    if (!hasConstants || !hasInterfaces) {
        log_1.log({ hasConstants, hasInterfaces }, 'pattern');
        return;
    }
    const withConstants = rambdax_1.replace(constants_1.CONSTANTS_MARKER, constantTypings_1.constantTypingsTemplate(input.constantName, input.constantValue, content), content);
    const newContent = rambdax_1.replace(constants_1.ACTION_INTERFACES_MARKER, actionTypings_1.actionTypingsTemplate(input.actionName, input.constantName, content), withConstants);
    outputFileSync_1.outputFileSync(input.typingsLocation, newContent);
}
exports.editTypings = editTypings;
//# sourceMappingURL=editTypings.js.map