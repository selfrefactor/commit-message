const { resolve } = require('path')

const getLogCommand = () => {
  const configFilePath = resolve(__dirname, '../config')
  const cacheFilePath = `${ configFilePath }/tmp`
  const logFilePath = `${ configFilePath }/tmp/eslint.txt`

  return {
    commandPartial : `-o ${ logFilePath } --cache --cache-location ${ cacheFilePath }`,
    logFilePath,
  }
}

const commandFactory = ({ src, eslintPath }) => {
  const eslint = `${ eslintPath }`
  const configFilePath = resolve(__dirname, '../config')
  const cacheFilePath = `${ configFilePath }/tmp`
  const logFilePath = `${ configFilePath }/tmp/eslint.txt`
  const willReturn = {}

  willReturn.logFilePath = logFilePath
  const eslintConfig = `-o ${ logFilePath } --cache --cache-location ${ cacheFilePath }`
  const eslintConfigDefault = `${ eslintConfig } --config ${ configFilePath }/.eslintrcDefault.js`
  const eslintConfigReact = `${ eslintConfig } --config ${ configFilePath }/.eslintrcReact.js`
  const eslintConfigJest = `${ eslintConfig } --config ${ configFilePath }/.eslintrcJest.js`
  const eslintConfigSaga = `${ eslintConfig } --config ${ configFilePath }/.eslintrcSaga.js`

  willReturn.lintDefault = `${ eslint } ${ src } --fix ${ eslintConfigDefault }`
  willReturn.lintDefaultNoFix = `${ eslint } ${ src } ${ eslintConfigDefault }`
  willReturn.lintReact = `${ eslint } ${ src } --fix ${ eslintConfigReact }`
  willReturn.lintReactNoFix = `${ eslint } ${ src } ${ eslintConfigReact }`
  willReturn.lintSaga = `${ eslint } ${ src } --fix ${ eslintConfigSaga }`
  willReturn.lintSagaNoFix = `${ eslint } ${ src } ${ eslintConfigSaga }`
  willReturn.lintJest = `${ eslint } ${ src } --fix ${ eslintConfigJest }`
  willReturn.lintJestNoFix = `${ eslint } ${ src } ${ eslintConfigJest }`

  return willReturn
}

exports.getLogCommand = getLogCommand
exports.commandFactory = commandFactory
