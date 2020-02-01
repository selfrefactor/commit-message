"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prompts = require("prompts");
const getAllConstants_1 = require("./_helpers/getAllConstants");
const string_fn_1 = require("string-fn");
const isRootConstant = {
    type: 'toggle',
    name: 'isRoot',
    message: 'Does it belong to `root` namespace',
    initial: false,
    active: 'no',
    inactive: 'yes'
};
async function fn() {
    try {
        const allConstants = getAllConstants_1.getAllConstants('/home/just/repos/do/demoReact/constants.ts');
        const choices = allConstants.map(x => ({
            title: string_fn_1.dotCase(x)
        }));
        const question = {
            type: 'autocomplete',
            name: 'answer',
            message: 'Pick your favorite actor',
            choices
        };
        const { answer } = await prompts([question]);
        const { isRoot } = await prompts([isRootConstant]);
        /**
         * Prompts library return inverted answer
         */
        return isRoot ?
            answer :
            `root.${answer}`;
    }
    catch (err) {
        throw err;
    }
}
exports.fn = fn;
fn()
    .then(console.log)
    .catch(console.log);
// askInputTemplate({
//   key: 'test',
//   question: 'Test input',
// }).then(answer => {
//   const normalized = normalize(answer)
//   const normalizedTestInput = normalizeTestInput(answer)
//   const len = [normalized.length, normalizedTestInput.length]
//   log({
//     normalized,
//     normalizedTestInput,
//     len,
//   }, 'patternx')
// })
// tslint:enable
//# sourceMappingURL=debug.js.map