process.env.NODE_ENV = 'DEBUG'
const { lintFn } = require('../lintFn')
const { resolve } = require('path')

const filePath = resolve(__dirname, '../../tag-fn/src/cli.ts')

void (async function prove(){
  console.time('prove')
  await lintFn(filePath)
  console.timeEnd('prove')
})()
