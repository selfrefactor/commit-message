"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("log");
const getAcreage_1 = require("./getAcreage");
const getAddress_1 = require("./getAddress");
const getIdentifikator_1 = require("./getIdentifikator");
const getLocationRegister_1 = require("./getLocationRegister");
const getNeighbours_1 = require("./getNeighbours");
const getOldID_1 = require("./getOldID");
const getPermanentPurpose_1 = require("./getPermanentPurpose");
const getPreviousNumber_1 = require("./getPreviousNumber");
const getPurpose_1 = require("./getPurpose");
const getSkitsa_1 = require("./getSkitsa");
const getZapoved_1 = require("./getZapoved");
function getResult(text) {
    const acreage = getAcreage_1.getAcreage(text);
    const address = getAddress_1.getAddress(text);
    const identificator = getIdentifikator_1.getIdentifikator(text);
    const locationRegister = getLocationRegister_1.getLocationRegister(text);
    const neighbours = getNeighbours_1.getNeighbours(text);
    const oldID = getOldID_1.getOldID(text);
    const permanentPurpose = getPermanentPurpose_1.getPermanentPurpose(text);
    const previousNumber = getPreviousNumber_1.getPreviousNumber(text);
    const purpose = getPurpose_1.getPurpose(text);
    const skitsa = getSkitsa_1.getSkitsa(text);
    const zapoved = getZapoved_1.getZapoved(text);
    log_1.log({ oldID, previousNumber, neighbours }, 'pattern');
    log_1.log({ permanentPurpose, purpose, zapoved, address, acreage }, 'pattern');
    log_1.log({ skitsa, locationRegister, identificator }, 'pattern');
    return {
        acreage,
        address,
        identificator,
        locationRegister,
        neighbours,
        oldID,
        permanentPurpose,
        previousNumber,
        purpose,
        skitsa,
        zapoved,
    };
}
exports.getResult = getResult;
//# sourceMappingURL=getResult.js.map