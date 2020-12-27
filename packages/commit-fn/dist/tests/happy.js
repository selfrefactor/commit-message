"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const cwd = __dirname;
__1.commitMessage(cwd)
    .then((commitMessageValue) => {
    console.log(commitMessageValue);
})
    .catch(console.log);
//# sourceMappingURL=happy.js.map