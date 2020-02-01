"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const string_fn_1 = require("string-fn");
const outputFileSync_1 = require("../_modules/outputFileSync");
const textToJs_1 = require("../_modules/textToJs");
/**
 * Create new epic files - index and starter
 */
function createEpic(_) {
    const constantKey = string_fn_1.constantCase(`${_.name}.${_.firstEpicStarter}`);
    const epic = string_fn_1.camelCase(_.firstEpic);
    const action = string_fn_1.pascalCase(`${constantKey}.action`);
    const epicContent = textToJs_1.textToJs(path_1.resolve(__dirname, '../../templates/component/epic.txt'), [constantKey, epic, action]);
    outputFileSync_1.outputFileSync(_.epicLocation, epicContent);
    const exportedEpicName = string_fn_1.camelCase(`${_.name}.epic`);
    const indexEpicContent = textToJs_1.textToJs(path_1.resolve(__dirname, '../../templates/component/indexEpic.txt'), [epic, exportedEpicName]);
    outputFileSync_1.outputFileSync(_.indexEpicLocation, indexEpicContent);
    const x = string_fn_1.camelCase(_.name);
    const y = string_fn_1.constantCase(_.firstEpicStarter);
    const constantValue = `${x}@${y}`;
    return {
        constantKey,
        constantValue,
    };
}
exports.createEpic = createEpic;
//# sourceMappingURL=createEpic.js.map