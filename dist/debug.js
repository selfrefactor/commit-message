"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
_1.commitAndPush().then((commitMessageValue) => {
    console.log(commitMessageValue);
    // => 'feat@style - use animation when logout'
})
    .catch(console.log);
//# sourceMappingURL=debug.js.map