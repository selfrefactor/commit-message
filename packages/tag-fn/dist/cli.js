"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_fn_1 = require("helpers-fn");
const rambdax_1 = require("rambdax");
const setGithubTag_1 = require("./setGithubTag");
const setCredentials_1 = require("./helpers/setCredentials");
const allPossibleTags = ['minor', 'major', 'patch'];
async function cli(debugInput) {
    const [cliInput] = rambdax_1.drop(3, process.argv);
    const input = debugInput ? debugInput : cliInput;
    if (input === 'init')
        return setCredentials_1.setCredentials();
    const tag = rambdax_1.defaultTo('patch', input);
    if (allPossibleTags.includes(tag)) {
        helpers_fn_1.log(`${tag} incrementation of the latest tag will be applied\n`, 'info');
    }
    else {
        helpers_fn_1.log(`The new tag will be '${tag}'\n`, 'info');
    }
    helpers_fn_1.log('spin');
    await setGithubTag_1.setGithubTag(tag);
    helpers_fn_1.log('stopspin');
}
exports.cli = cli;
//# sourceMappingURL=cli.js.map