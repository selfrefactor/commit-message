"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
const string_fn_1 = require("string-fn");
const outputFileSync_1 = require("../_modules/outputFileSync");
const constants_1 = require("../constants");
const INTERFACE_LIMIT = 3;
function getAsyncTemplate(normalizedInput, fileName, interfaceValue) {
    return `${interfaceValue}export async function ${fileName}(${normalizedInput}){
  try{\n
    return
  }catch(e){
    throw e
  }
}\n`;
}
function getStandardTemplate(normalizedInput, fileName, interfaceValue) {
    return `${interfaceValue}export function ${fileName}(${normalizedInput}){\n
  return
}\n`;
}
const importTemplate = rambdax_1.glue(`
  export function {{fileName}}
  ({{inputArguments}}){\n\n}
`);
function getJavascriptTemplate(_) {
    if (!_.typeExport) {
        return rambdax_1.template(importTemplate, _);
    }
    return `function ${_.fileName}(${_.inputArguments}){\n
  return
}

exports.${_.fileName} = ${_.fileName}\n`;
}
/**
 * Generate module's function arguments
 */
function normalizeInput(inputArguments, fileName) {
    if (inputArguments.trim() === '') {
        return '';
    }
    const inputList = inputArguments.split(',');
    const beautifiedInput = inputList
        .map(singleInput => `${singleInput}: any`)
        .join(', ');
    return inputList.length < INTERFACE_LIMIT ?
        beautifiedInput :
        `input: ${string_fn_1.pascalCase(fileName)}Input`;
}
/**
 * Generate interface on the base of `inputArguments`
 */
function getInterface(_) {
    if (_.inputArguments.trim() === '') {
        return '';
    }
    const inputList = _.inputArguments.split(',');
    if (inputList.length < INTERFACE_LIMIT) {
        return '';
    }
    const interfaceProperties = inputList
        .map(singleInput => `\t${singleInput}: any`)
        .join('\n');
    return `interface ${string_fn_1.pascalCase(_.fileName)}Input{
${interfaceProperties}
}\n\n`;
}
function createModuleFile(input) {
    const { fileName, folderPath, inputArguments, selectedMode, rootInput, } = input;
    const interfaceValue = getInterface(input);
    const normalizedInput = normalizeInput(inputArguments, fileName);
    const template = selectedMode === constants_1.ASYNC_MODULE ?
        getAsyncTemplate(normalizedInput, fileName, interfaceValue) :
        selectedMode === constants_1.STANDARD_MODULE ?
            getStandardTemplate(normalizedInput, fileName, interfaceValue) :
            getJavascriptTemplate(input);
    const separator = folderPath === '' ? '' : '/';
    const fileExtension = selectedMode === constants_1.JAVASCRIPT_MODULE ?
        'js' :
        'ts';
    const filePathHead = `${rootInput.srcDirectory}/${folderPath}${separator}`;
    const filePathTail = `${fileName}.${fileExtension}`;
    const filePath = `${filePathHead}${filePathTail}`;
    outputFileSync_1.outputFileSync(filePath, template);
}
exports.createModuleFile = createModuleFile;
//# sourceMappingURL=createModuleFile.js.map