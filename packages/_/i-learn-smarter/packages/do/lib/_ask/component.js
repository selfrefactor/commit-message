"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const askInputTemplate_1 = require("../_modules/askInputTemplate");
const askListTemplate_1 = require("../_modules/askListTemplate");
// STEP_1
exports.askComponentName = async () => askInputTemplate_1.askInputTemplate({
    key: 'componentName',
    question: 'Name of your component(DOTCASE)',
});
// STEP_2
exports.askComponentFirstEpic = async () => askInputTemplate_1.askInputTemplate({
    key: 'componentFirstEpic',
    question: 'Pick an epic name(DOTCASE)',
});
// OPTIONAL_STEP_3
exports.askFirstEpicStarter = async () => askInputTemplate_1.askInputTemplate({
    info: `Name local action that triggers the first epic
Note that you can refer only to FOO namespace and 
you don't need to write the namespace, i.e. 'init' instead of 'foo.init'`,
    key: 'componentFirstEpicStarter',
    question: 'Which action will ignite your epic(DOTCASE)',
});
// STEP_4
exports.askComponentStoreType = async () => askListTemplate_1.askListTemplate({
    choices: ['own.store', 'root.store', 'both'],
    key: 'componentStoreType',
    question: 'Select type of component\'s store',
});
// OPTIONAL_STEP_5
// PART_1
exports.askStoreLoopStart = async () => askListTemplate_1.askListTemplate({
    choices: ['add.prop', 'add.optional.prop', 'done'],
    key: 'loopStart',
    question: 'Add interface\'s (optional)property or you are ready',
});
// OPTIONAL_PART_2
exports.askStorePropName = async () => askInputTemplate_1.askInputTemplate({
    key: 'propName',
    question: 'Property name(DOTCASE)',
});
// OPTIONAL_PART_3
exports.askStorePropTyping = async () => askInputTemplate_1.askInputTemplate({
    info: 'You can use shorten versions: bool, num, obj, str',
    key: 'propTyping',
    question: 'Property definition',
});
// OPTIONAL_PART_4
// normalize input
exports.askStorePropInitial = async () => askInputTemplate_1.askInputTemplate({
    info: 'Input will be normalized from string to other types',
    key: 'propInitial',
    question: 'Initial state of this property',
});
//# sourceMappingURL=component.js.map