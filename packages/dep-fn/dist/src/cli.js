"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli = void 0;
const update_1 = require("./update");
async function cli(mode = 'updateall') {
    if (mode === 'updateall') {
        process.env.DEP_FN_UPDATE_ALL = 'true';
    }
    await update_1.update();
}
exports.cli = cli;
