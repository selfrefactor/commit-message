"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playwrightSettings = void 0;
exports.playwrightSettings = {
    headless: process.env.DEBUG !== 'true',
    url: 'about:blank',
};
