const { existsSync } = require('fs')
const { resolve } = require('path')

const whenDebug = resolve(
  __dirname,
  '../node_modules/eslint/bin/eslint.js'
)
const whenGlobal = resolve(
  __dirname,
  '../../../node_modules/eslint/bin/eslint.js'
)
const whenLocal = resolve(__dirname, '../../../../eslint/bin/eslint.js')

exports.getEslintPath = debugFlag => {
  if (debugFlag) return whenDebug
  if (existsSync(whenGlobal)) return whenGlobal
  if (existsSync(whenLocal)) return whenLocal

  return false
}
