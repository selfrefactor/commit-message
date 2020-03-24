const {lintFn} = require('lint-fn')
const filePath = `${__dirname}/src/foo.ts`

void (async function testLint() {
  console.time('lint')
  await lintFn(filePath)
  console.timeEnd('lint')
})()