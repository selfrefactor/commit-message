"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const rambdax_1 = require("rambdax");
const normalizeTestInput_1 = require("../_helpers/normalizeTestInput");
const outputFileSync_1 = require("../_modules/outputFileSync");
const constants_1 = require("../constants");
const updateScripts_1 = require("../_modules/updateScripts");
function getAsyncTemplate(input) {
    const normalizedTestInput = normalizeTestInput_1.normalizeTestInput(input.testInput);
    return `import { ${input.fileName} } from './${input.fileName}'\n
test('', async () =>{
  const result = await ${input.fileName}(${normalizedTestInput})
  const expectedResult = ${normalizeTestInput_1.normalize(input.expectedResult)}\n
  expect(
    result
  ).toEqual(expectedResult)
})`;
}
function getStandardTemplate(input) {
    const normalizedTestInput = normalizeTestInput_1.normalizeTestInput(input.testInput);
    return `import { ${input.fileName} } from './${input.fileName}'\n
test('', () =>{
  const result = ${input.fileName}(${normalizedTestInput})
  const expectedResult = ${normalizeTestInput_1.normalize(input.expectedResult)}\n
  expect(
    result
  ).toEqual(expectedResult)
})`;
}
/**
 * Template is in CommonJS style
 * No async mode supported for now_
 * as the end user would have too many choices
 * Lowercase after now signals that the sentence_
 * continues on the next line
 */
function getJavascriptTemplate(_) {
    const regular = rambdax_1.glue(`
  const { ${_.fileName} }
  =
  require('./${_.fileName}')  
`);
    const modern = rambdax_1.glue(`
    import { ${_.fileName} } 
    from './${_.fileName}'`);
    const importStatement = _.typeExport ?
        regular :
        modern;
    return `${importStatement}\n
test('', () =>{
  ${createConstStatements(_)}
  const result = ${_.fileName}(${_.inputArguments})
  const expectedResult = ${normalizeTestInput_1.normalize(_.expectedResult)}\n
  expect(
    result
  ).toEqual(expectedResult)
})`;
}
/**
 * Create `const foo = 'FOO_INPUT'` statements
 * Going in this direction makes declaring_
 * input arguments mandatory
 */
function createConstStatements(input) {
    const listOfStatements = [];
    for (const prop in input.testInput) {
        const statement = `const ${prop} = ${normalizeTestInput_1.normalize(input.testInput[prop])}\n`;
        listOfStatements.push(statement);
    }
    return listOfStatements.join('  ');
}
function createTestFile(input) {
    const { selectedMode, fileName, folderPath, rootInput, } = input;
    const template = selectedMode === constants_1.ASYNC_MODULE ?
        getAsyncTemplate(input) :
        selectedMode === constants_1.STANDARD_MODULE ?
            getStandardTemplate(input) :
            getJavascriptTemplate(input);
    const separator = folderPath === '' ? '' : '/';
    const fileExtension = selectedMode === constants_1.JAVASCRIPT_MODULE ?
        'js' :
        'ts';
    const filePath = path_1.resolve(rootInput.srcDirectory, `${folderPath}${separator}${fileName}.spec.${fileExtension}`);
    outputFileSync_1.outputFileSync(filePath, template);
    if (input.rootInput.vscode === false) {
        updateScripts_1.updateScripts(filePath, rootInput);
    }
}
exports.createTestFile = createTestFile;
//# sourceMappingURL=createTestFile.js.map