"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const normalizeId_1 = require("../helpers/normalizeId");
function build(input) {
    return (`съгласно Схема № ${input.shema}г. на СлГКК - ${input.locationRegister}: САМОСТОЯТЕЛЕН ОБЕКТ В СГРАДА с идентификатор ${input.id} /${normalizeId_1.normalizeId(input.id)}/ по кадастралната карта и кадастралните регистри, одобрени със Заповед ${input.zapoved}г. на Изпълнителния директор на АГКК: Адрес на имота: ${input.address}: ${input.text}, посочена в документа площ:	${input.acreage}, прилежащи части: ${input.attachments}, при съседни самостоятелни обекти в сградата: на същия етаж:  ${input.neighboursSameFloor}, под обекта: ${input.neighboursBelowFloor}, над обекта: ${input.neighboursAboveFloor}`);
}
exports.build = build;
//# sourceMappingURL=build.js.map