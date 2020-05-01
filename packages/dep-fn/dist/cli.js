"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_fn_1 = require("helpers-fn");
const special_1 = require("./special");
const update_1 = require("./update");
// import {renovate} from './renovate'
process.on('unhandledRejection', (reason, promise) => {
    console.log(reason, promise);
});
process.on('uncaughtException', err => {
    console.log(err);
});
async function cli() {
    const input = process.argv[3];
    const target = process.argv[4];
    let method;
    switch (input) {
        case 'add':
            method = special_1.special;
            break;
        case 'special':
            method = special_1.special;
            break;
        case 'update':
            method = update_1.update;
            break;
        case 'updateall':
            process.env.DEP_FN_UPDATE_ALL = 'true';
            method = update_1.update;
            break;
        default:
            helpers_fn_1.log('Default method is "updateall"', 'info');
            process.env.DEP_FN_UPDATE_ALL = 'true';
            method = update_1.update;
    }
    await method();
    return console.log('done');
}
exports.cli = cli;
