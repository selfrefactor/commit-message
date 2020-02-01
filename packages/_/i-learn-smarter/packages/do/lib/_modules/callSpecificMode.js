"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const string_fn_1 = require("string-fn");
const component_1 = require("../component/");
const epic_1 = require("../epic/");
const testable_module_1 = require("../testable_module/");
const allModes = {
    component: component_1.component,
    epic: epic_1.epic,
    testableModule: testable_module_1.testableModule,
};
async function callSpecificMode(selectedMode, rootInput) {
    const modeKey = selectedMode.endsWith('MODULE') ?
        'testableModule' :
        string_fn_1.camelCase(selectedMode);
    return allModes[modeKey](rootInput, selectedMode);
}
exports.callSpecificMode = callSpecificMode;
//# sourceMappingURL=callSpecificMode.js.map