"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("log");
const string_fn_1 = require("string-fn");
const askUser_1 = require("./askUser");
const getAllComponents_1 = require("../_helpers/getAllComponents");
const connectEpic_1 = require("./connectEpic");
const createEpic_1 = require("./createEpic");
const editActions_1 = require("./editActions");
const editConstants_1 = require("./editConstants");
const editTypings_1 = require("./editTypings");
/**
 * Creates new epic within selected folder that expects specific action
 */
async function epic(rootInput) {
    try {
        var asked = await askUser_1.askUser(rootInput);
        const allComponents = await getAllComponents_1.getAllComponents(rootInput.srcDirectory);
        const folderName = string_fn_1.snakeCase(asked.folder);
        const dir = `${rootInput.srcDirectory}/${folderName}`;
        /**
         * On purpose repeat those declarations
         * anti-DRY principle
         */
        const actionsLocation = `${dir}/actions.ts`;
        const constantsLocation = `${rootInput.srcDirectory}/constants.ts`;
        const epicLocation = `${dir}/epics/${string_fn_1.camelCase(asked.name)}.ts`;
        const indexEpicLocation = `${dir}/epics/index.ts`;
        const typingsLocation = `${rootInput.srcDirectory}/typings.d.ts`;
        var basicInput = {
            ...asked,
            actionsLocation,
            allComponents,
            constantsLocation,
            epicLocation,
            indexEpicLocation,
            rootInput,
            typingsLocation,
        };
        const createdEpic = createEpic_1.createEpic(basicInput);
        var input = {
            ...basicInput,
            ...createdEpic,
        };
        editTypings_1.editTypings(input);
        editActions_1.editActions(input);
        editConstants_1.editConstants(input);
        connectEpic_1.connectEpic(input);
        if (process.env.NODE_ENV === 'test') {
            log_1.log(input, 'obj');
        }
        else {
            log_1.log('', 'success');
        }
    }
    catch (e) {
        console.log(e);
        console.log(asked, 'asked');
        console.log(input, 'input');
    }
}
exports.epic = epic;
//# sourceMappingURL=index.js.map