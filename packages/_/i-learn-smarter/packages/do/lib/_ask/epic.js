"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getAllComponents_1 = require("../_helpers/getAllComponents");
const askInputTemplate_1 = require("../_modules/askInputTemplate");
const askListTemplate_1 = require("../_modules/askListTemplate");
// STEP_1
exports.askFolder = async (input) => {
    const components = await getAllComponents_1.getAllComponents(input.srcDirectory);
    return askListTemplate_1.askListTemplate({
        choices: components,
        key: 'folder',
        question: 'Location of new epic',
    });
};
// STEP_2
exports.askName = async () => askInputTemplate_1.askInputTemplate({
    key: 'name',
    question: 'Name(DOTCASE)',
});
// STEP_3
exports.askStarterActionType = async () => askListTemplate_1.askListTemplate({
    choices: ['new', 'existing'],
    key: 'starterActionType',
    question: 'Start your epic with new or existing constant',
});
// OPTIONAL_STEP_4
exports.askStarterAction = async () => askInputTemplate_1.askInputTemplate({
    key: 'starterAction',
    question: 'Action starting this epic(DOTCASE)',
});
//# sourceMappingURL=epic.js.map