"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const rambdax_1 = require("rambdax");
const string_fn_1 = require("string-fn");
const outputFileSync_1 = require("../_modules/outputFileSync");
const constants_1 = require("./../constants");
function editIndexTsx(input) {
    let content = fs_1.readFileSync(input.indexTsxLocation).toString();
    const componentName = string_fn_1.pascalCase(`${input.name}.wrapped`);
    const importLocation = `'./${input.folderName}/component'`;
    const importStatement = `import { ${componentName} } from ${importLocation}`;
    const importComponent = `${constants_1.COMPONENTS_MARKER}\n${importStatement}`;
    content = rambdax_1.replace(constants_1.COMPONENTS_MARKER, importComponent, content);
    const path = string_fn_1.kebabCase(input.name);
    const paddingLength = getPadding(content);
    const padding = Array(paddingLength).fill(' ').join('');
    const pad = `\n  ${padding}`;
    const padShort = `\n${padding}`;
    const a = `<Route${pad}component={${componentName}}`;
    const b = `exact={true}${pad}path='/${path}'${padShort}/>`;
    const route = `${a}${pad}${b}`;
    const createRoute = `${constants_1.ROUTES_MARKER}${padShort}${route}`;
    content = rambdax_1.replace(constants_1.ROUTES_MARKER, createRoute, content);
    outputFileSync_1.outputFileSync(input.indexTsxLocation, content);
}
exports.editIndexTsx = editIndexTsx;
function getPadding(content) {
    const [line] = rambdax_1.match(/.+{\/\* ROUTES_MARKER \*\/}/, content);
    const padding = rambdax_1.replace(constants_1.ROUTES_MARKER, '', line);
    return padding.length;
}
//# sourceMappingURL=editIndexTsx.js.map