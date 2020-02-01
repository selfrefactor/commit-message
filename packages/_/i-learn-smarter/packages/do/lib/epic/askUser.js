"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const epic_1 = require("./../_ask/epic");
const string_fn_1 = require("string-fn");
const epic_2 = require("../_ask/epic");
const selectStarterAction_1 = require("../_ask/selectStarterAction");
async function askUser(input) {
    const folder = await epic_1.askFolder(input);
    const name = await epic_1.askName();
    const starterActionType = await epic_2.askStarterActionType();
    const isNew = starterActionType === 'NEW';
    const starterActionRaw = isNew ?
        await epic_1.askStarterAction() :
        await selectStarterAction_1.selectStarterAction(input);
    const starterAction = isNew ?
        `${string_fn_1.dotCase(folder)}.${starterActionRaw}` :
        starterActionRaw;
    return {
        folder,
        name,
        starterAction,
    };
}
exports.askUser = askUser;
//# sourceMappingURL=askUser.js.map