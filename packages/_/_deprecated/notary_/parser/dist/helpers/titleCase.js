"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
const longCityMap = {
    'В.Търново': 'Велико Търново',
    'Ст.Загора': 'Стара Загора',
};
function titleCase(str) {
    const willReturn = rambdax_1.join(' ', rambdax_1.map(val => `${rambdax_1.toUpper(rambdax_1.head(val))}${rambdax_1.toLower(rambdax_1.tail(val))}`, rambdax_1.split(' ', str)));
    const condition = Object.values(longCityMap).indexOf(willReturn);
    return condition === -1 ?
        willReturn :
        Object.keys(longCityMap)[condition];
}
exports.titleCase = titleCase;
//# sourceMappingURL=titleCase.js.map