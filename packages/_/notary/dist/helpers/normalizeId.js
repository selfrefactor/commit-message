"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hash = {
    '0': 'нула',
    '1': 'едно',
    '2': 'две',
    '3': 'три',
    '4': 'четири',
    '5': 'пет',
    '6': 'шест',
    '7': 'седем',
    '8': 'осем',
    '9': 'девет',
};
function normalizeId(input) {
    const normalized = input.split('').map(x => hash[x] ? hash[x] : 'точка');
    return normalized.join(', ');
}
exports.normalizeId = normalizeId;
//# sourceMappingURL=normalizeId.js.map