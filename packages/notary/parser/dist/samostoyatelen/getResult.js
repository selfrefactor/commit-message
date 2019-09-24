"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const normalizeAcreage_1 = require("../helpers/normalizeAcreage");
const normalizeAddress_1 = require("../helpers/normalizeAddress");
const normalizeAttachments_1 = require("../helpers/normalizeAttachments");
const normalizeText_1 = require("../helpers/normalizeText");
const titleCase_1 = require("../helpers/titleCase");
const match_1 = require("../modules/match");
const build_1 = require("./build");
const LABEL = 'samostoyatelen';
function getResultSamostoyatelen(input) {
    try {
        const matchFn = (label, fn) => match_1.match(input, label, fn);
        const matchxFn = (label, fn) => match_1.matchTwoSteps(input, label, fn);
        /**
         * Схема
         */
        const shema = matchFn('shema');
        /**
         * Локална служба по картография
         */
        const locationRegister = matchFn('location.register', titleCase_1.titleCase);
        /**
         * Идентификатор
         */
        const id = matchFn('identifikator');
        /**
         * Адрес
         */
        const address = matchFn(`address.${LABEL}`, normalizeAddress_1.normalizeAddress);
        /**
         * Текст
         */
        const text = matchFn(`text.${LABEL}`, normalizeText_1.normalizeText);
        /**
         * Площ
         */
        const acreage = matchFn(`acreage.${LABEL}`, normalizeAcreage_1.normalizeAcreage);
        /**
         * Прилежащи части
         */
        const attachments = matchxFn(`attachments.${LABEL}`, normalizeAttachments_1.normalizeAttachments);
        /**
         * Съседи
         */
        const neighboursSameFloor = matchFn(`same.floor.${LABEL}`);
        const neighboursBelowFloor = matchFn(`below.floor.${LABEL}`);
        const neighboursAboveFloor = matchFn(`above.floor.${LABEL}`);
        /**
         * Заповед
         */
        const zapoved = matchFn(`zapoved.${LABEL}`);
        const builded = build_1.build({
            acreage,
            address,
            attachments,
            id,
            locationRegister,
            neighboursAboveFloor,
            neighboursBelowFloor,
            neighboursSameFloor,
            shema,
            text,
            zapoved,
        });
        return builded;
    }
    catch (e) {
        throw e;
    }
}
exports.getResultSamostoyatelen = getResultSamostoyatelen;
//# sourceMappingURL=getResult.js.map