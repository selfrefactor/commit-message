"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
exports.getUpdateURL = rambdax_1.compose(rambdax_1.head, rambdax_1.identity, rambdax_1.split('#'));
//# sourceMappingURL=getUpdateURL.js.map