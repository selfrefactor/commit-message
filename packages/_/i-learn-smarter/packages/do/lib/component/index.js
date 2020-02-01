"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("log");
const string_fn_1 = require("string-fn");
const askUser_1 = require("./askUser");
const createActions_1 = require("./createActions");
const createComponent_1 = require("./createComponent");
const createEpic_1 = require("./createEpic");
const createReducers_1 = require("./createReducers");
const editCombinedReducers_1 = require("./editCombinedReducers");
const editConstants_1 = require("./editConstants");
const editIndexTsx_1 = require("./editIndexTsx");
const editRootEpic_1 = require("./editRootEpic");
const editTypings_1 = require("./editTypings");
async function component(rootInput) {
    try {
        var asked = await askUser_1.askUser();
        const folderName = string_fn_1.snakeCase(asked.name);
        const dir = `${rootInput.srcDirectory}/${folderName}`;
        const root = `${rootInput.srcDirectory}/root`;
        const storeName = string_fn_1.camelCase(`${asked.name}.store`);
        const storeTyping = string_fn_1.pascalCase(`${asked.name}.store`);
        const actionsLocation = `${dir}/actions.ts`;
        const combinedReducersLocation = `${root}/combinedReducers.ts`;
        const componentLocation = `${dir}/component.tsx`;
        const constantsLocation = `${rootInput.srcDirectory}/constants.ts`;
        const epicLocation = `${dir}/epics/${string_fn_1.camelCase(asked.firstEpic)}.ts`;
        const indexEpicLocation = `${dir}/epics/index.ts`;
        const indexTsxLocation = `${rootInput.srcDirectory}/index.tsx`;
        const reducersLocation = `${dir}/reducers.ts`;
        const rootEpicLocation = `${root}/epics/index.ts`;
        const typingsLocation = `${rootInput.srcDirectory}/typings.d.ts`;
        var input = {
            ...asked,
            actionsLocation,
            combinedReducersLocation,
            componentLocation,
            constantsLocation,
            epicLocation,
            folderName,
            indexEpicLocation,
            indexTsxLocation,
            reducersLocation,
            rootEpicLocation,
            rootInput,
            storeName,
            storeTyping,
            typingsLocation,
        };
        const createdEpic = createEpic_1.createEpic(input);
        var extendedInput = {
            ...input,
            ...createdEpic,
        };
        createReducers_1.createReducers(input);
        createActions_1.createActions(extendedInput);
        createComponent_1.createComponent(extendedInput);
        editTypings_1.editTypings(extendedInput);
        editRootEpic_1.editRootEpic(extendedInput);
        editConstants_1.editConstants(extendedInput);
        editCombinedReducers_1.editCombinedReducers(extendedInput);
        editIndexTsx_1.editIndexTsx(input);
        if (process.env.NODE_ENV === 'test') {
            log_1.log(extendedInput, 'obj');
        }
        else {
            log_1.log('', 'success');
        }
    }
    catch (e) {
        console.log(e);
        console.log(asked, 'asked');
        console.log(input, 'input');
        console.log(extendedInput, 'extendedInput');
    }
}
exports.component = component;
//# sourceMappingURL=index.js.map