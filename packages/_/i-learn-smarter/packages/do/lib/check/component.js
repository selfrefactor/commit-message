"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const marker_1 = require("./marker");
const rambdax_1 = require("rambdax");
const string_fn_1 = require("string-fn");
const constants_1 = require("../constants");
function singleCheck(singleComponent, file) {
    const marker = `// ${string_fn_1.constantCase(singleComponent)}`;
    const route = `path='/${string_fn_1.kebabCase(singleComponent)}'`;
    const wrappedComponent = `${string_fn_1.pascalCase(singleComponent)}Wrapped`;
    const epic = `${string_fn_1.camelCase(singleComponent)}Epic`;
    const store = `${string_fn_1.camelCase(singleComponent)}Store`;
    const markers = rambdax_1.switcher(file.key)
        .is('typings', [marker])
        .is('constants', [marker])
        .is('rootEpic', [epic])
        .is('combinedReducers', [store])
        .is('indexTsx', [route, wrappedComponent])
        .default([]);
    marker_1.markerCheck({
        location: file.location,
        markers,
    });
}
function componentCheck(singleComponent, rootFiles, srcDirectory) {
    const dir = `${srcDirectory}/${singleComponent}`;
    const actions = {
        location: `${dir}/actions.ts`,
        markers: [constants_1.IMPORT_CONSTANTS_MARKER, constants_1.ACTIONS_MARKER],
    };
    const component = {
        location: `${dir}/component.tsx`,
        markers: [],
    };
    const reducers = {
        location: `${dir}/reducers.ts`,
        markers: [],
    };
    const indexEpic = {
        location: `${dir}/epics/index.ts`,
        markers: [constants_1.IMPORT_EPICS_MARKER, constants_1.CONNECT_EPICS_MARKER],
    };
    const files = {
        actions,
        component,
        indexEpic,
        reducers,
    };
    Object.values(files).forEach(marker_1.markerCheck);
    rootFiles.forEach(rootFile => singleCheck(singleComponent, rootFile));
}
exports.componentCheck = componentCheck;
//# sourceMappingURL=component.js.map