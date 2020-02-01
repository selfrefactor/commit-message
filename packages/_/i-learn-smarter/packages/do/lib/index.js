"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("inquirer");
const callSpecificMode_1 = require("./_modules/callSpecificMode");
const types_1 = require("./_modules/types");
var check_1 = require("./check");
exports.check = check_1.check;
async function doModule(rootInput) {
    try {
        const thisTypes = rootInput.mode === 'NODE' ?
            types_1.nodeTypes :
            types_1.reactTypes;
        const { selectedMode } = await inquirer_1.prompt([{
                choices: Object.values(thisTypes),
                message: 'Select option',
                name: 'selectedMode',
                type: 'list',
            }]);
        return callSpecificMode_1.callSpecificMode(selectedMode, rootInput);
    }
    catch (e) {
        console.log(e);
    }
}
exports.doModule = doModule;
//# sourceMappingURL=index.js.map