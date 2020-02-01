"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./../_ask/component");
const rambdax_1 = require("rambdax");
const string_fn_1 = require("string-fn");
const normalizeInput_1 = require("../_helpers/normalizeInput");
/**
 * Allow use of shorter version of types
 */
function normalizePropTyping(propTypingRaw) {
    return rambdax_1.switcher(propTypingRaw)
        .is('str', 'string')
        .is('obj', 'object')
        .is('num', 'number')
        .is('bool', 'boolean')
        .default(propTypingRaw);
}
/**
 * User input sets initial state and store description
 */
async function askStore() {
    const initialState = {};
    const interfaceProps = [];
    let loopFlag = true;
    while (loopFlag) {
        const storeLoopStart = await component_1.askStoreLoopStart();
        if (storeLoopStart === 'DONE') {
            loopFlag = false;
            continue;
        }
        const propNameRaw = await component_1.askStorePropName();
        const propName = string_fn_1.camelCase(propNameRaw);
        const propTypingRaw = await component_1.askStorePropTyping();
        const propTyping = normalizePropTyping(propTypingRaw);
        const isOptional = storeLoopStart === 'ADD_OPTIONAL_PROP';
        const connector = isOptional ? '?:' : ':';
        interfaceProps.push(`${propName}${connector} ${propTyping}`);
        if (!isOptional) {
            const propInitial = await component_1.askStorePropInitial();
            initialState[propName] = normalizeInput_1.normalizeInput(propInitial);
        }
    }
    return { initialState, interfaceProps };
}
exports.askStore = askStore;
//# sourceMappingURL=askStore.js.map