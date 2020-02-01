import { resolve } from 'path'
import { glue } from 'rambdax'
import { normalize, normalizeTestInput } from '../_helpers/normalizeTestInput'
import { outputFileSync } from '../_modules/outputFileSync'
import {
  ASYNC_MODULE,
  JAVASCRIPT_MODULE,
  STANDARD_MODULE,
} from '../constants'
import { updateScripts } from '../_modules/updateScripts';

function getAsyncTemplate(input: CreateTestFile) {
  const normalizedTestInput = normalizeTestInput(input.testInput)

  return `import { ${input.fileName} } from './${input.fileName}'\n
test('', async () =>{
  const result = await ${input.fileName}(${normalizedTestInput})
  const expectedResult = ${normalize(input.expectedResult)}\n
  expect(
    result
  ).toEqual(expectedResult)
})`
}

function getStandardTemplate(input: CreateTestFile) {

  const normalizedTestInput = normalizeTestInput(input.testInput)

  return `import { ${input.fileName} } from './${input.fileName}'\n
test('', () =>{
  const result = ${input.fileName}(${normalizedTestInput})
  const expectedResult = ${normalize(input.expectedResult)}\n
  expect(
    result
  ).toEqual(expectedResult)
})`
}

/**
 * Template is in CommonJS style
 * No async mode supported for now_
 * as the end user would have too many choices
 * Lowercase after now signals that the sentence_
 * continues on the next line
 */
function getJavascriptTemplate(_: CreateTestFile) {
  const regular = glue(`
  const { ${_.fileName} }
  =
  require('./${_.fileName}')  
`)

  const modern = glue(`
    import { ${_.fileName} } 
    from './${_.fileName}'`
  )

  const importStatement = _.typeExport ?
    regular :
    modern

  return `${importStatement}\n
test('', () =>{
  ${createConstStatements(_)}
  const result = ${_.fileName}(${_.inputArguments})
  const expectedResult = ${normalize(_.expectedResult)}\n
  expect(
    result
  ).toEqual(expectedResult)
})`
}

/**
 * Create `const foo = 'FOO_INPUT'` statements
 * Going in this direction makes declaring_
 * input arguments mandatory
 */
function createConstStatements(input: CreateTestFile): string {
  const listOfStatements = []
  for (const prop in input.testInput) {
    const statement = `const ${prop} = ${normalize(input.testInput[prop])}\n`
    listOfStatements.push(statement)
  }

  return listOfStatements.join('  ')
}

export function createTestFile(input: CreateTestFile) {
  const {
    selectedMode,
    fileName,
    folderPath,
    rootInput,
  } = input

  const template = selectedMode === ASYNC_MODULE ?
    getAsyncTemplate(input) :
    selectedMode === STANDARD_MODULE ?
      getStandardTemplate(input) :
      getJavascriptTemplate(input)

  const separator = folderPath === '' ? '' : '/'
  const fileExtension = selectedMode === JAVASCRIPT_MODULE ?
    'js' :
    'ts'

  const filePath = resolve(
    rootInput.srcDirectory,
    `${folderPath}${separator}${fileName}.spec.${fileExtension}`,
  )

  outputFileSync(filePath, template)
  if(input.rootInput.vscode === false){
    updateScripts(filePath, rootInput)
  }
}
