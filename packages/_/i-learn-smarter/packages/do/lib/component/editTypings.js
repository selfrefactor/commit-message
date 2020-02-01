"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const string_fn_1 = require("string-fn");
const constants_1 = require("./../constants");
const fs_1 = require("fs");
const rambdax_1 = require("rambdax");
const outputFileSync_1 = require("../_modules/outputFileSync");
const actionTypings_1 = require("../_templates/actionTypings");
const constantTypings_1 = require("../_templates/constantTypings");
const propsTypings_1 = require("../_templates/propsTypings");
/**
 * Edit typings.d.ts to include new store; its props;
 * action interfaces; constants-like types;
 */
function editTypings(input) {
    let typingsContent = fs_1.readFileSync(input.typingsLocation).toString();
    const STORE_INTERFACE = string_fn_1.pascalCase(`${input.name}.store`);
    const STORE_PROP = string_fn_1.camelCase(`${input.name}.store`);
    const hasOwnStore = input.storeType !== 'ROOT_STORE';
    /**
     * It has its own store that needs to be declared
     */
    if (hasOwnStore) {
        typingsContent = rambdax_1.replace(constants_1.INJECT_COMPONENT_MARKER, propsTypings_1.propsTypingsTemplate(input, STORE_PROP, STORE_INTERFACE), typingsContent);
    }
    const getStateStatement = `${STORE_PROP}?: ${STORE_INTERFACE},`;
    const getStateInjection = `${constants_1.GET_STATE_MARKER}\n  ${getStateStatement}`;
    const hasMarker = typingsContent.includes(constants_1.GET_STATE_MARKER);
    const withoutGetState = !typingsContent.includes(getStateStatement);
    const ok = hasOwnStore && hasMarker && withoutGetState;
    if (ok) {
        typingsContent = rambdax_1.replace(constants_1.GET_STATE_MARKER, getStateInjection, typingsContent);
    }
    const namespacedFirstEpicStarter = `${input.name}.${input.firstEpicStarter}`;
    const actionName = string_fn_1.pascalCase(`${namespacedFirstEpicStarter}.action`);
    const actionType = string_fn_1.constantCase(namespacedFirstEpicStarter);
    const actionTypeHead = string_fn_1.camelCase(input.name);
    const actionTypeTail = string_fn_1.constantCase(input.firstEpicStarter);
    const actionTypeValue = `${actionTypeHead}@${actionTypeTail}`;
    /**
     * Spaces around `actionType` is to ensure not a substring is matched
     */
    if (!typingsContent.includes(` ${actionType} `)) {
        typingsContent = rambdax_1.replace(constants_1.CONSTANTS_MARKER, constantTypings_1.constantTypingsTemplate(actionType, actionTypeValue, typingsContent), typingsContent);
    }
    if (!typingsContent.includes(` ${actionName} `)) {
        typingsContent = rambdax_1.replace(constants_1.ACTION_INTERFACES_MARKER, actionTypings_1.actionTypingsTemplate(actionName, actionType, typingsContent), typingsContent);
    }
    outputFileSync_1.outputFileSync(input.typingsLocation, typingsContent);
}
exports.editTypings = editTypings;
//# sourceMappingURL=editTypings.js.map