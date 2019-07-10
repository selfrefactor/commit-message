"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("helpers");
const special_1 = require("./special");
const update_1 = require("./update");
process.on('unhandledRejection', (reason, promise) => {
    console.log(reason, promise);
});
process.on('uncaughtException', err => {
    console.log(err);
});
function cli() {
    const input = process.argv[3];
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
            helpers_1.log('You didn\'t provide a valid method', 'error');
            process.exit();
    }
    method()
        .then(() => {
        console.log('done');
    })
        .catch(console.log);
}
exports.cli = cli;
//# sourceMappingURL=cli.js.map