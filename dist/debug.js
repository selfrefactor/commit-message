"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
async function debug() {
    const result = await index_1.commitMessage();
}
index_1.commitMessage().then(console.log);
//# sourceMappingURL=debug.js.map