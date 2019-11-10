"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
const convertNumbers_1 = require("../helpers/convertNumbers");
const getNumberOfStreet_1 = require("../helpers/getNumberOfStreet");
const translateNumber_1 = require("../helpers/translateNumber");
function getText(input) {
    const rawText = `
Съгласно скица № ${input.skitsa} на СлГКК ${input.locationRegister} -
ПОЗЕМЛЕН ИМОТ с идентификатор ${input.identificator}/${convertNumbers_1.convertNumbers(input.identificator)}/
по кадастралната карта и кадастрални регистри,
одобрени със Заповед № ${input.zapoved} на ИД на АГКК,
адрес на имота ${input.address}/${translateNumber_1.translateNumber(getNumberOfStreet_1.getNumberOfStreet(input.address))}/,
с площ от ${input.acreage},
с трайно предназначение на територията - ${input.purpose}
и начин на трайно ползване – ${input.permanentPurpose},
стар идентификатор – ${input.oldID},
номер по предходен план - ${input.previousNumber},
при съседи: ${input.neighbours}
`;
    const replaced = rambdax_1.replace(/\n/gm, ' ', rawText);
    return replaced.trim();
}
exports.getText = getText;
//# sourceMappingURL=getText.js.map