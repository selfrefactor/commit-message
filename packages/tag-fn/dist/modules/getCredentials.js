"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const fs_extra_1 = require("fs-extra");
const helpers_fn_1 = require("helpers-fn");
const path_1 = require("path");
const rambdax_1 = require("rambdax");
const settingsLocation = path_1.resolve(__dirname, '../../files/config.json');
exports.getCredentials = () => {
    if (fs_1.existsSync(settingsLocation)) {
        return fs_extra_1.readJsonSync(settingsLocation);
    }
    const user = process.env.GITHUB_USER;
    const password = process.env.GITHUB_PASSWORD;
    if (rambdax_1.any(rambdax_1.isNil, [user, password])) {
        helpers_fn_1.log('You haven\'t set credentials!', 'error');
        helpers_fn_1.log('Check https://github.com/selfrefactor/tag-fn#initialization', 'info');
        process.exit();
    }
    return { user, password };
};
//# sourceMappingURL=getCredentials.js.map