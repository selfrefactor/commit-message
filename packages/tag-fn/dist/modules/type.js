"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
async function typeModule(input) {
    const { page, text, selector } = input;
    await page.focus(selector);
    const textAsArray = rambdax_1.split('', text);
    return rambdax_1.mapAsync(async (char) => {
        await page.keyboard.sendCharacter(char);
        await rambdax_1.delay(100);
    }, textAsArray);
}
exports.typeModule = typeModule;
//# sourceMappingURL=type.js.map