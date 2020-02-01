"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const outputFileSync_1 = require("../_modules/outputFileSync");
const stringify_1 = require("../_modules/stringify");
const textToJs_1 = require("../_modules/textToJs");
function createReducers(input) {
    /**
     * Line 17 of askStore.ts
     * using undefined to mark use of root store
     * in this case we can't create reducers file
     */
    if (!input.store)
        return;
    const initialState = stringify_1.stringify(input.store.initialState);
    const reducersContent = textToJs_1.textToJs(path_1.resolve(__dirname, '../../templates/component/reducers.txt'), [initialState, input.storeName, input.storeTyping]);
    outputFileSync_1.outputFileSync(input.reducersLocation, reducersContent);
}
exports.createReducers = createReducers;
//# sourceMappingURL=createReducers.js.map