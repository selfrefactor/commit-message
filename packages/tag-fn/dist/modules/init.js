"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const helpers_fn_1 = require("helpers-fn");
const path_1 = require("path");
const settingsLocation = path_1.resolve(__dirname, '../../files/config.json');
exports.init = (credentials) => {
    fs_extra_1.writeJsonSync(settingsLocation, credentials);
    helpers_fn_1.log('Credentials are set.', 'info');
};
//# sourceMappingURL=init.js.map