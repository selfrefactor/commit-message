process.env.LINT_FN_DEBUG = 'ON'
process.env.SKIP_ESLINT_RULES = 'no-nested-ternary,max-len'
const { lintFn } = require('../lintFn')

const filePath = `${ process.env.HOME }/repos/rambda/source/lensPath.js`

void (async function prove(){
  console.time('prove')
  await lintFn(filePath)
  console.timeEnd('prove')
})()
