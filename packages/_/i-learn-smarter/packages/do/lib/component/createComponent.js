"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const rambdax_1 = require("rambdax");
const string_fn_1 = require("string-fn");
const outputFileSync_1 = require("../_modules/outputFileSync");
const textToJs_1 = require("../_modules/textToJs");
function createComponent(input) {
    const templateFileName = input.firstEpicStarter === 'init' ?
        'componentWithInit.txt' :
        'component.txt';
    const templateFilePath = path_1.resolve(__dirname, `../../templates/component/${templateFileName}`);
    const localStore = string_fn_1.camelCase(`${input.name}.store`);
    const className = string_fn_1.pascalCase(input.name);
    const props = input.storeType === 'ROOT_STORE' ?
        'Props' :
        string_fn_1.pascalCase(`${input.name}.props`);
    /**
     * Define connect store as a string: `fooStore, barStore`
     */
    const connectStores = rambdax_1.switcher(input.storeType)
        .is('ROOT_STORE', 'store')
        .is('OWN_STORE', localStore)
        // when BOTH
        .default(`store, ${localStore}`);
    const templateContent = textToJs_1.textToJs(templateFilePath, [className, props, connectStores]);
    outputFileSync_1.outputFileSync(input.componentLocation, templateContent);
}
exports.createComponent = createComponent;
//# sourceMappingURL=createComponent.js.map