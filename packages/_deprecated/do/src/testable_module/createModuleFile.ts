import { template, glue } from 'rambdax'
import { pascalCase } from 'string-fn'
import { outputFileSync } from '../_modules/outputFileSync'
import {
  ASYNC_MODULE,
  JAVASCRIPT_MODULE,
  STANDARD_MODULE,
} from '../constants'

const INTERFACE_LIMIT = 3

function getAsyncTemplate(
  normalizedInput: string,
  fileName: string,
  interfaceValue: string,
) {

  return `${interfaceValue}export async function ${fileName}(${normalizedInput}){
  try{\n
    return
  }catch(e){
    throw e
  }
}\n`
}

function getStandardTemplate(
  normalizedInput: string,
  fileName: string,
  interfaceValue: string,
) {

  return `${interfaceValue}export function ${fileName}(${normalizedInput}){\n
  return
}\n`
}

const importTemplate = glue(`
  export function {{fileName}}
  ({{inputArguments}}){\n\n}
`)

function getJavascriptTemplate(_: {
  inputArguments: string, 
  fileName: string, 
  typeExport: boolean
}) {
  if(!_.typeExport){
    return template(
      importTemplate,
      _
    )
  }

  return `function ${_.fileName}(${_.inputArguments}){\n
  return
}

exports.${_.fileName} = ${_.fileName}\n`
}

/**
 * Generate module's function arguments
 */
function normalizeInput(inputArguments: string, fileName: string): string {
  if (inputArguments.trim() === '') {
    return ''
  }
  const inputList = inputArguments.split(',')
  const beautifiedInput = inputList
    .map(singleInput => `${singleInput}: any`)
    .join(', ')

  return inputList.length < INTERFACE_LIMIT ?
    beautifiedInput :
    `input: ${pascalCase(fileName)}Input`
}

/**
 * Generate interface on the base of `inputArguments`
 */
function getInterface(_: {inputArguments: string, fileName: string}) {
  if (_.inputArguments.trim() === '') {

    return ''
  }

  const inputList = _.inputArguments.split(',')

  if (inputList.length < INTERFACE_LIMIT) {

    return ''
  }

  const interfaceProperties = inputList
    .map(singleInput => `\t${singleInput}: any`)
    .join('\n')

  return `interface ${pascalCase(_.fileName)}Input{
${interfaceProperties}
}\n\n`
}

export function createModuleFile(input: CreateModuleFile) {
  const {
    fileName,
    folderPath,
    inputArguments,
    selectedMode,
    rootInput,
  } = input

  const interfaceValue = getInterface(input)
  const normalizedInput = normalizeInput(inputArguments, fileName)

  const template = selectedMode === ASYNC_MODULE ?
    getAsyncTemplate(normalizedInput, fileName, interfaceValue) :
    selectedMode === STANDARD_MODULE ?
      getStandardTemplate(normalizedInput, fileName, interfaceValue) :
      getJavascriptTemplate(input)

  const separator = folderPath === '' ? '' : '/'
  const fileExtension = selectedMode === JAVASCRIPT_MODULE ?
    'js' :
    'ts'

  const filePathHead = `${rootInput.srcDirectory}/${folderPath}${separator}`
  const filePathTail = `${fileName}.${fileExtension}`
  const filePath = `${filePathHead}${filePathTail}`

  outputFileSync(filePath, template)
}
