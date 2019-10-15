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

const KNOWN_FAILING_TESTS = {
  adjust  : 1,
  allPass : 1,
  anyPass : 1,
  both : 1,
  complement : 1,
  compose : 3,
  concat : 1,
  curry : 5,
}

function getNumberFailing(testOutput){
  const [ line ] = testOutput.split('\n').filter(x => x.includes('failing'))
  const [ numberFailing ] = line.split('failing')

  return Number(numberFailing.trim())
}

async function checkSingleMethod(method){
  console.log(method)
  const { command, outputPath } = getCommand(method)

  await exec({
    cwd : `${process.env.HOME}/repos/services/packages/ramda-tests/ramda`,
    command,
  })
  const testOutput = readFileSync(outputPath).toString()
  if (!testOutput.includes('failing')) return unlinkSync(outputPath)

  const numberFailing = getNumberFailing(testOutput)

  if (!KNOWN_FAILING_TESTS[ method ] || numberFailing > KNOWN_FAILING_TESTS[ method ]){
    throw new Error(`${method} has ${numberFailing} tests`)
  } 
  
  unlinkSync(outputPath)
}

void async function runTests(){
  const allMethods = Object.keys(R).filter(x => x !== 'partialCurry')

  await mapAsync(
    checkSingleMethod
  )(allMethods)
}()
