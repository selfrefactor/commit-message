const R = require('rambda')
const { exec } = require('helpers')
const { glue, mapAsync } = require('rambdax')
const { readFileSync, unlinkSync } = require('fs')

const getOutputPath = x => `${ process.env.HOME }/repos/services/packages/ramda-tests/outputs/${ x }.txt`

const getCommand = x => {
  const outputPath = getOutputPath(x)
  const command = glue(`
  BABEL_ENV=cjs
  node 
  node_modules/mocha/bin/mocha
  --require 
  @babel/register 
  --reporter
  spec 
  test/${ x }.js
  > ${ outputPath } 2>&1
  `)

  return {
    command,
    outputPath,
  }
}

async function checkSingleMethod(method){
  const { command, outputPath } = getCommand(method)

  await exec({
    cwd : '/home/matrix/repos/services/packages/ramda-tests/ramda',
    command,
  })
  const testOutput = readFileSync(outputPath).toString()
  if (testOutput.includes('failing')) return

  unlinkSync(outputPath)
}

void async function runTests(){
  const allMethods = Object.keys(R).filter(x => x !== 'partialCurry')

  await mapAsync(
    checkSingleMethod
  )(allMethods)
}()
