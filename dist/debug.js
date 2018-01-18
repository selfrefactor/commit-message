"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
index_1.commitMessage().then((commitMessageValue) => {
    console.log(commitMessageValue);
    // => 'feat@style - use animation when logout'
})
    .catch(console.log);
//# sourceMappingURL=debug.js.map