"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require("inquirer");
const init_1 = require("../modules/init");
async function setCredentials() {
    const credentials = await inquirer
        .prompt([
        { type: 'input', message: 'Your Github username?', name: 'user' },
        { type: 'password', message: 'Your Github password?', name: 'password' },
    ]);
    return init_1.init(credentials);
}
exports.setCredentials = setCredentials;
//# sourceMappingURL=setCredentials.js.map