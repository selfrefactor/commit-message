"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentTag = () => {
    const selector = 'div[class="f1 flex-auto min-width-0 text-normal"] > a';
    const tagElements = Array.from(document.querySelectorAll(selector));
    if (tagElements.length === 0) {
        return '0.0.0';
    }
    const tagElement = tagElements[0];
    return tagElement.text;
};
//# sourceMappingURL=getCurrentTag.js.map