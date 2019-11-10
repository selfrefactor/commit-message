"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const init_puppeteer_1 = require("init-puppeteer");
const rambdax_1 = require("rambdax");
const normalize_1 = require("./normalize");
const debug_1 = require("../_modules/debug");
async function bulgarian(word) {
    try {
        const settings = {
            headless: true,
            url: `https://translate.google.com/?hl=en&tab=TT#bg/en/`,
        };
        var { browser, page } = await init_puppeteer_1.initPuppeteer(settings);
        const _ = init_puppeteer_1.attach(page);
        await page.focus('#source');
        await rambdax_1.delay(1000);
        let holder = [];
        let counter = -1;
        for (const char of word.split('')) {
            counter++;
            await page.keyboard.sendCharacter(char);
            if (counter < 3) {
                await rambdax_1.delay(rambdax_1.random(150, 200));
                continue;
            }
            await rambdax_1.delay(rambdax_1.random(750, 1000));
            const textContent = await _.$$('.gt-baf-translations', els => els.map(x => x.textContent));
            const ok = textContent !== null && textContent.length > holder.length;
            holder = ok ? textContent : holder;
        }
        await browser.close();
        if (holder === null)
            return [];
        const final = normalize_1.normalize(word, holder);
        return final;
    }
    catch (e) {
        console.log(e);
        if (browser !== undefined && browser.close !== undefined) {
            await browser.close();
        }
        return [];
    }
}
exports.bulgarian = bulgarian;
if (debug_1.debug()) {
    bulgarian("решението").then(result => {
        console.log(result);
    });
}
//# sourceMappingURL=index.js.map