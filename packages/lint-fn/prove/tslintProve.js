process.env.NODE_ENV = 'DEBUG'
const { lintFn } = require('../lintFn')

const filePath = `${ process.env.HOME }/repos/rambda-docs/src/app/whole/whole.component.ts`

void (async function prove(){
  console.time('prove')
  await lintFn(filePath) 
  console.timeEnd('prove')
})()
