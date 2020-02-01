"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const string_fn_1 = require("string-fn");
const reactTypesList = [
    'epic',
    'component',
    'async.module',
    'standard.module',
    'javascript.module',
];
const nodeTypesList = [
    'async.module',
    'standard.module',
    'javascript.module',
];
const exportHolder = {
    nodeTypes: {},
    reactTypes: {},
};
const icons = [
    '✔️  ',
    '🔘  ',
    '☑️  ',
    '🔴  ',
    '✅  ',
    '⚙️  ',
];
let iconCounter = -1;
const getIcon = () => {
    iconCounter++;
    if (iconCounter === icons.length) {
        iconCounter = 0;
    }
    return icons[iconCounter];
};
nodeTypesList.forEach(singleType => {
    exportHolder.nodeTypes[singleType] = {
        name: `${getIcon()} ${string_fn_1.pascalCase(singleType)}`,
        value: string_fn_1.constantCase(singleType),
    };
});
reactTypesList.forEach(singleType => {
    exportHolder.reactTypes[singleType] = {
        name: `${getIcon()} ${string_fn_1.pascalCase(singleType)}`,
        value: string_fn_1.constantCase(singleType),
    };
});
exports.nodeTypes = exportHolder.nodeTypes;
exports.reactTypes = exportHolder.reactTypes;
//# sourceMappingURL=types.js.map