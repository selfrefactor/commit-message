"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./../_ask/component");
const askStore_1 = require("./askStore");
async function askUser() {
    const name = await component_1.askComponentName();
    const firstEpic = await component_1.askComponentFirstEpic();
    const firstEpicStarter = await component_1.askFirstEpicStarter();
    const storeType = await component_1.askComponentStoreType();
    /**
     * Use `undefined` instead of false to bypass Typescript warning
     */
    const store = storeType === 'ROOT_STORE' ?
        undefined :
        await askStore_1.askStore();
    return {
        firstEpic,
        firstEpicStarter,
        name,
        store,
        storeType,
    };
}
exports.askUser = askUser;
//# sourceMappingURL=askUser.js.map