"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const log_1 = require("log");
const rambdax_1 = require("rambdax");
const string_fn_1 = require("string-fn");
const getAllComponents_1 = require("../_helpers/getAllComponents");
const component_1 = require("./component");
const marker_1 = require("./marker");
async function check(srcDirectory) {
    const allComponentsRaw = await getAllComponents_1.getAllComponents(srcDirectory);
    const allComponents = allComponentsRaw.filter(x => x !== 'root' && !x.startsWith('_'));
    const markers = allComponents.map(x => `// ${string_fn_1.constantCase(x)}`);
    const combinedReducers = {
        key: 'combinedReducers',
        location: `${srcDirectory}/root/combinedReducers.ts`,
        markers: [constants_1.IMPORT_STORES_MARKER, constants_1.CONNECT_STORES_MARKER],
    };
    const constants = {
        key: 'constants',
        location: `${srcDirectory}/constants.ts`,
        markers,
    };
    const indexTsx = {
        key: 'indexTsx',
        location: `${srcDirectory}/index.tsx`,
        markers: [constants_1.COMPONENTS_MARKER, constants_1.ROUTES_MARKER],
    };
    const rootEpic = {
        key: 'rootEpic',
        location: `${srcDirectory}/root/epics/index.ts`,
        markers: [
            constants_1.CONNECT_EPICS_MARKER,
            constants_1.IMPORT_EPICS_MARKER,
        ],
    };
    const typings = {
        key: 'typings',
        location: `${srcDirectory}/typings.d.ts`,
        markers: [
            constants_1.ACTION_INTERFACES_MARKER,
            constants_1.CONSTANTS_MARKER,
            constants_1.INJECT_COMPONENT_MARKER,
        ],
    };
    const files = {
        combinedReducers,
        constants,
        indexTsx,
        rootEpic,
        typings,
    };
    const filteredFiles = rambdax_1.filter(marker_1.markerCheck, Object.values(files));
    allComponents.forEach(singleComponent => component_1.componentCheck(singleComponent, filteredFiles, srcDirectory));
    log_1.log('', 'success');
}
exports.check = check;
//# sourceMappingURL=index.js.map