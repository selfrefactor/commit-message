"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const string_fn_1 = require("string-fn");
const outputFileSync_1 = require("../_modules/outputFileSync");
const textToJs_1 = require("../_modules/textToJs");
function createActions(input) {
    const templateLocation = path_1.resolve(__dirname, '../../templates/component/actions.txt');
    const emptyTemplateLocation = path_1.resolve(__dirname, '../../templates/component/actionsEmpty.txt');
    const action = string_fn_1.camelCase(input.firstEpicStarter);
    const actionsContent = textToJs_1.textToJs(templateLocation, [input.constantKey, action]);
    outputFileSync_1.outputFileSync(input.actionsLocation, actionsContent);
    return actionsContent;
}
exports.createActions = createActions;
//# sourceMappingURL=createActions.js.map