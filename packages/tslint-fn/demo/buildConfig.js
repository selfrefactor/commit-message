const {config} = require('./eslintrcOrigin')
const {outputFileSync} = require('fs-extra')

void (function buildConfig() {
  const content = JSON.stringify(config, null, 2)
  const toSave = `module.exports = ${content}`

  outputFileSync(`${__dirname}/.eslintrc.js`, toSave)
})()
