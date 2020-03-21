const { glue } = require('rambdax')
const { exec } = require('./execCommand')

async function usePrettier({ filePath, withTypescript }){
  // await delay(200)
  const typescriptPart = withTypescript ? '' : '--parser typescript'

  const command = glue(`
  prettier 
  --no-semi
  --no-bracket-spacing
  --print-width 90
  --single-quote
  --no-bracket-spacing
  --trailing-comma es5
  --write
  ${ typescriptPart }
  ${ filePath }
`)
  await exec(command)
}

exports.usePrettier = usePrettier
