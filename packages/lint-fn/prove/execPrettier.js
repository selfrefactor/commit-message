process.env.NODE_ENV = 'DEBUG'
const { execPrettier } = require('../lintFn')

const filePath = `${ process.env.HOME }/repos/rambda/source/add.js`
const injectOptions = '--print-width 34'

void (async function prove(){
  console.time('prove')
  await execPrettier({
    filePath,
    injectOptions,
  })
  console.timeEnd('prove')
})()
