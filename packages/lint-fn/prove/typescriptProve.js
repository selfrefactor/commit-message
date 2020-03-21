process.env.NODE_ENV = 'DEBUG'
const { lintFn } = require('../')

void (async function prove(){
  console.time('prove')
  await lintFn({ filePath : `${ process.env.HOME }/repos/rambda-docs/src/app/whole/whole.component.ts` })
  console.timeEnd('prove')
})()
