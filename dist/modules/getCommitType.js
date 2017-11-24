"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const promptSelect_1 = require("./promptSelect");
async function getCommitType() {
    try {
        const promptOptions = {
            choices: constants_1.typesOfCommitKeys,
            question: constants_1.ASK_FOR_TYPE,
        };
        const typeOfCommitKey = await promptSelect_1.promptSelect(promptOptions);
        const [commit] = constants_1.typesOfCommit.filter(x => x.key === typeOfCommitKey);
        return commit;
    }
    catch (err) {
        throw err;
    }
}
exports.getCommitType = getCommitType;
//# sourceMappingURL=getCommitType.js.map