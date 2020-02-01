"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./../constants");
/**
 * Create constants-like types
 */
function constantTypingsTemplate(actionType, actionTypeValue, content) {
    if (content.includes(`type ${actionType} =`)) {
        return constants_1.CONSTANTS_MARKER;
    }
    const STATEMENT = `type ${actionType} = '${actionTypeValue}'`;
    return `${constants_1.CONSTANTS_MARKER}\n${STATEMENT}`;
}
exports.constantTypingsTemplate = constantTypingsTemplate;
//# sourceMappingURL=constantTypings.js.map