"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function normalizeInput(input) {
    try {
        // tslint:disable-next-line
        let result;
        const codeToEval = `result = ${input}`;
        // tslint:disable-next-line
        eval(codeToEval);
        return result;
    }
    catch (e) {
        // when input is string
        return `'${input}'`;
    }
}
exports.normalizeInput = normalizeInput;
exports.normalizeInput = normalizeInput;
//# sourceMappingURL=normalizeInput.js.map