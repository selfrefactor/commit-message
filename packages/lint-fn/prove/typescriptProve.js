process.env.NODE_ENV = 'DEBUG'
const { lintFn } = require('../lintFn')

const filePath = `${ process.env.HOME }/repos/services/packages/tag-fn/src/index.ts`

void (async function prove(){
  console.time('prove')
  await lintFn(filePath)
  console.timeEnd('prove')
})()
