process.env.LINT_FN_DEBUG = 'ON'
const { lintFn } = require('../lintFn')

const filePath = `${ process.env.HOME }/repos/rambda/source/compose.spec.js`

void (async function prove(){
  console.time('prove')
  await lintFn(filePath)
  console.timeEnd('prove')
})()
