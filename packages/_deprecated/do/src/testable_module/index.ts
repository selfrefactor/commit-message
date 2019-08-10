import { prompt } from 'inquirer'
import { log } from 'helpers'
import { askExpectedResult } from '../_ask/expectedResult'
import { askTestInput } from '../_ask/testInput'
import { filePathInfo } from '../_info/filePath'
import { inputArgumentsInfo } from '../_info/inputArguments'
import { parseFilePath } from '../_modules/parseFilePath'

import { createModuleFile } from './createModuleFile'
import { createTestFile } from './createTestFile'

/**
 * Create module, its basic test and change dev, devx scripts
 */
export async function testableModule(
  rootInput: DoModule, 
  selectedMode: string
) {
  filePathInfo()
  const {typeExport} = await prompt([{
    message: 'Use `exports.foo = foo`?',
    name: 'typeExport',
    type: 'confirm',
    default: true
  }])

  const { filePath } = await prompt([{
    message: 'Filepath of your module',
    name: 'filePath',
    type: 'input',
  }])

  const { folderPath, fileName } = parseFilePath(filePath)

  inputArgumentsInfo()
  const { inputArguments } = await prompt([{
    message: 'Input arguments separated by comma',
    name: 'inputArguments',
    type: 'input',
  }])

  const initialInput = {
    fileName,
    folderPath,
    inputArguments,
    rootInput,
    selectedMode,
    typeExport
  }

  createModuleFile(initialInput)

  const testInput = await askTestInput(inputArguments)

  const expectedResult = await askExpectedResult()

  const input = {
    ...initialInput,
    expectedResult,
    testInput,
  }
  createTestFile(input)

  log(input, 'obj')
}
