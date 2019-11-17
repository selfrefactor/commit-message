"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conversionList = [
    'нула',
    'едно',
    'две',
    'три',
    'четири',
    'пет',
    'шест',
    'седем',
    'осем',
    'девет',
];
function convert(char) {
    return char === '.' ?
        'точка' :
        conversionList[Number(char)];
}
function convertNumbers(input) {
    const convertedList = input.split('').map(convert);
    return convertedList.join(', ');
}
exports.convertNumbers = convertNumbers;
//# sourceMappingURL=convertNumbers.js.map