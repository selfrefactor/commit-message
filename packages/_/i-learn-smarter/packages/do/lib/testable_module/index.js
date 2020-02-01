"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("inquirer");
const log_1 = require("log");
const expectedResult_1 = require("../_ask/expectedResult");
const testInput_1 = require("../_ask/testInput");
const filePath_1 = require("../_info/filePath");
const inputArguments_1 = require("../_info/inputArguments");
const parseFilePath_1 = require("../_modules/parseFilePath");
const createModuleFile_1 = require("./createModuleFile");
const createTestFile_1 = require("./createTestFile");
/**
 * Create module, its basic test and change dev, devx scripts
 */
async function testableModule(rootInput, selectedMode) {
    filePath_1.filePathInfo();
    const { typeExport } = await inquirer_1.prompt([{
            message: 'Use `exports.foo = foo`?',
            name: 'typeExport',
            type: 'confirm',
            default: true
        }]);
    const { filePath } = await inquirer_1.prompt([{
            message: 'Filepath of your module',
            name: 'filePath',
            type: 'input',
        }]);
    const { folderPath, fileName } = parseFilePath_1.parseFilePath(filePath);
    inputArguments_1.inputArgumentsInfo();
    const { inputArguments } = await inquirer_1.prompt([{
            message: 'Input arguments separated by comma',
            name: 'inputArguments',
            type: 'input',
        }]);
    const initialInput = {
        fileName,
        folderPath,
        inputArguments,
        rootInput,
        selectedMode,
        typeExport
    };
    createModuleFile_1.createModuleFile(initialInput);
    const testInput = await testInput_1.askTestInput(inputArguments);
    const expectedResult = await expectedResult_1.askExpectedResult();
    const input = {
        ...initialInput,
        expectedResult,
        testInput,
    };
    createTestFile_1.createTestFile(input);
    log_1.log(input, 'obj');
}
exports.testableModule = testableModule;
//# sourceMappingURL=index.js.map