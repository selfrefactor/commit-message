"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = require("puppeteer");
const getSettings_1 = require("./getSettings");
async function initPuppeteer() {
    const resolutionValue = { x: 1366, y: 768 };
    const settings = getSettings_1.getSettings(resolutionValue);
    const browser = await puppeteer_1.launch(settings);
    const page = await browser.newPage();
    await page.setViewport({
        height: resolutionValue.y,
        width: resolutionValue.x,
    });
    return { browser, page };
}
exports.initPuppeteer = initPuppeteer;
//# sourceMappingURL=initPuppeteer.js.map