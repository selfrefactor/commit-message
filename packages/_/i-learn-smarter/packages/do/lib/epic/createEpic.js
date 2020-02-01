"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
const path_1 = require("path");
const string_fn_1 = require("string-fn");
const outputFileSync_1 = require("../_modules/outputFileSync");
const textToJs_1 = require("../_modules/textToJs");
function namespacing(input) {
    const allComponents = input.allComponents.map(string_fn_1.dotCase);
    const whichFolder = rambdax_1.find(_ => input.starterAction.startsWith(_), allComponents);
    const actionIsRoot = whichFolder === 'root';
    const isLocal = input.starterAction.startsWith(whichFolder);
    const partToRemove = actionIsRoot ?
        '' :
        `${whichFolder}.`;
    const withoutFolder = rambdax_1.replace(partToRemove, '', input.starterAction);
    const constantValue = actionIsRoot ?
        string_fn_1.constantCase(input.starterAction) :
        `${string_fn_1.camelCase(input.folder)}@${string_fn_1.constantCase(withoutFolder)}`;
    return { constantValue, isLocal };
}
/**
 * Creates a new simple epic that starts with `starterAction`
 * It also sets variables needed to build `EpicInput`
 */
function createEpic(input) {
    const templateLocation = path_1.resolve(__dirname, '../../templates/component/epic.txt');
    const { constantValue, isLocal } = namespacing(input);
    const constantName = string_fn_1.constantCase(input.starterAction);
    const epicName = string_fn_1.camelCase(`${input.name}.epic`);
    const epicNameInTemplate = string_fn_1.camelCase(input.name);
    const actionName = string_fn_1.pascalCase(`${input.starterAction}.action`);
    const content = textToJs_1.textToJs(templateLocation, [constantName, epicNameInTemplate, actionName]);
    outputFileSync_1.outputFileSync(input.epicLocation, content);
    return {
        actionName,
        constantName,
        constantValue,
        epicName,
        isLocal,
    };
}
exports.createEpic = createEpic;
//# sourceMappingURL=createEpic.js.map