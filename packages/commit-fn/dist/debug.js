"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const cwd = __dirname;
// commitAndPush(cwd)
_1.commitMessage(cwd)
    .then((commitMessageValue) => {
    console.log(commitMessageValue);
})
    .catch(console.log);
//# sourceMappingURL=debug.js.map