"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const promptSelect_1 = require("./promptSelect");
async function getTypeCommit() {
    try {
        const promptOptions = {
            choices: constants_1.typesOfCommit,
            question: constants_1.ASK_FOR_TYPE,
        };
        const typeCommit = await promptSelect_1.promptSelect(promptOptions);
        return typeCommit;
    }
    catch (err) {
        throw err;
    }
}
exports.getTypeCommit = getTypeCommit;
//# sourceMappingURL=getTypeCommit.js.map