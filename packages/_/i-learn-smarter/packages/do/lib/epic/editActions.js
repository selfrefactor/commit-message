"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const log_1 = require("log");
const rambdax_1 = require("rambdax");
const string_fn_1 = require("string-fn");
const outputFileSync_1 = require("../_modules/outputFileSync");
const constants_1 = require("../constants");
/**
 * Create new action in case that we are in local namespace
 */
function editActions(input) {
    if (!input.isLocal) {
        return;
    }
    const content = fs_extra_1.readFileSync(input.actionsLocation).toString();
    const includesMarker = content.includes(constants_1.IMPORT_CONSTANTS_MARKER);
    const includesConstant = content.includes(input.constantName);
    if (!includesMarker || includesConstant) {
        log_1.log({ includesMarker, includesConstant }, 'pattern');
        return;
    }
    const injectionImport = `${constants_1.IMPORT_CONSTANTS_MARKER}\n  ${input.constantName},`;
    const withImport = rambdax_1.replace(constants_1.IMPORT_CONSTANTS_MARKER, injectionImport, content);
    /**
     * Turn `select.article.click` to `click`
     */
    const actionNameBase = rambdax_1.replace(string_fn_1.dotCase(input.folder), '', input.starterAction);
    const actionName = string_fn_1.camelCase(actionNameBase);
    const statement = `export const ${actionName} = createAction(${input.constantName})`;
    const injectionAction = `${constants_1.ACTIONS_MARKER}\n${statement}`;
    const newContent = rambdax_1.replace(constants_1.ACTIONS_MARKER, injectionAction, withImport);
    outputFileSync_1.outputFileSync(input.actionsLocation, newContent);
}
exports.editActions = editActions;
//# sourceMappingURL=editActions.js.map