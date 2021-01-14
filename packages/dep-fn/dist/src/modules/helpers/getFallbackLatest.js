"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFallBackLatest = void 0;
const execCommand_1 = require("./execCommand");
const rambdax_1 = require("rambdax");
const getFallBackLatest = async (dependency) => {
    const command = `npm info --json ${dependency}`;
    const packageInfoRaw = await execCommand_1.execCommand(command);
    try {
        const packageInfo = JSON.parse(packageInfoRaw);
        const filtered = packageInfo.versions.filter((x) => !x.includes('-'));
        if (filtered.length === 0)
            return rambdax_1.last(packageInfo.versions);
        return rambdax_1.last(filtered);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
};
exports.getFallBackLatest = getFallBackLatest;
