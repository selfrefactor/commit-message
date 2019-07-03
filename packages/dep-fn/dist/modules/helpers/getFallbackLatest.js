"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const execCommand_1 = require("./execCommand");
const rambdax_1 = require("rambdax");
exports.getFallBackLatest = async (dependency) => {
    const command = `npm info --json ${dependency}`;
    const packageInfoRaw = await execCommand_1.execCommand(command);
    try {
        const packageInfo = JSON.parse(packageInfoRaw);
        return rambdax_1.last(packageInfo.versions);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
};
//# sourceMappingURL=getFallbackLatest.js.map