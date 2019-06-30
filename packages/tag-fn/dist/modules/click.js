"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.click = (selector) => {
    const element = document.querySelector(selector);
    if (element === null) {
        throw `cannot click element with selector '${selector}'`;
    }
    element.click();
};
//# sourceMappingURL=click.js.map