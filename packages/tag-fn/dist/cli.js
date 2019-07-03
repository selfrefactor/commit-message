"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
process.on('unhandledRejection', (reason, promise) => {
    console.log(reason, promise);
});
process.on('uncaughtException', err => {
    console.log(err);
});
const inquirer = require("inquirer");
const helpers_1 = require("helpers");
const rambdax_1 = require("rambdax");
const index_1 = require("./index");
const init_1 = require("./modules/init");
const [input] = rambdax_1.drop(3, process.argv);
function cli() {
    if (input === 'init') {
        inquirer
            .prompt([
            { type: 'input', message: 'Your Github username?', name: 'user' },
            { type: 'password', message: 'Your Github password?', name: 'password' },
        ])
            .then((credentials) => {
            init_1.init(credentials);
        });
    }
    else {
        const tag = input === undefined ?
            'minor' :
            input;
        if (['minor', 'major', 'patch'].includes(tag)) {
            helpers_1.log(`${tag} incrementation of the latest tag will be applied\n`, 'info');
        }
        else {
            helpers_1.log(`The new tag will be '${tag}'\n`, 'info');
        }
        helpers_1.log('spin');
        index_1.tagFn({ tag })
            .then(() => {
            helpers_1.log('stopspin');
        })
            .catch(console.log);
    }
}
exports.cli = cli;
//# sourceMappingURL=cli.js.map