const { glue, replace, interpolate, remove } = require('rambdax')

const specTemplate = glue(`
  import { {{methodName}} } from './{{fileName}}'
  _NEW_LINE_
  test('happy', () => {
  ___{{methodName}}()
  })
`,
'\n')

const specTemplateAsync = glue(`
  import { {{methodName}} } from './{{fileName}}'
  _NEW_LINE_
  test('happy', async () => {
  ___await {{methodName}}()
  })
`,
'\n')

function specTemplateFn({ asyncFlag, fileName, methodName }){
  const actualTemplate = asyncFlag ? specTemplateAsync : specTemplate

  const result = interpolate(actualTemplate, {
    fileName : remove([ '.js', '.ts' ], fileName),
    methodName,
  })
  const withTab = replace(
    '___', '  ', result
  )
  const withNewLine = remove('_NEW_LINE_', withTab)

  return withNewLine
}

exports.specTemplate = specTemplateFn
