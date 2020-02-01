"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./../constants");
function actionTypingsTemplate(actionName, actionType, content) {
    if (content.includes(`interface ${actionName} {`)) {
        return constants_1.ACTION_INTERFACES_MARKER;
    }
    const X = `interface ${actionName} { type: ${actionType}, payload?: any }`;
    return `${constants_1.ACTION_INTERFACES_MARKER}\n${X}`;
}
exports.actionTypingsTemplate = actionTypingsTemplate;
//# sourceMappingURL=actionTypings.js.map