"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.latestTag = () => {
    const selector = '.Box-row h4 a';
    const tagElements = Array.from(document.querySelectorAll(selector));
    return tagElements.length === 0
        ? false
        : tagElements[0].text.trim();
};
