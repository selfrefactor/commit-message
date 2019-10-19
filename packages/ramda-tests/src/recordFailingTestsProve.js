const R = require('rambda')
const { exec } = require('helpers')
const { getIndent, indent } = require('string-fn')
const { glue, mapAsync, map, remove, test } = require('rambdax')
const { readFileSync, writeFileSync } = require('fs')
const { resolve } = require('path')
const BASE = resolve(__dirname, '../')

const getOutputPath = x => `${ BASE }/outputs/${ x }.txt`
const getTestPath = x => `${ BASE }/ramda/test/${ x }.js`

function prove(method){
  const content = readFileSync(
    getOutputPath(method)
  ).toString()
  const testContent = readFileSync(
    getTestPath(method)
  ).toString()

  const [ sk ] = content.split('passing')
  const goodTests = sk.split('\n')
    .filter(
      line => line.includes('✓')
    )
    .map(
      line => remove('✓', line).trim()
    )

  let flag = false
  let counter = 0
  let indentCount = 0
  const toReturn = []

  testContent.split('\n').forEach(
    line => {
      if (line.includes(goodTests[ counter ])){
        indentCount = getIndent(line)
        return flag = true
      } 
      if (line === `${ indent('});', indentCount) }`){
        counter++
        return flag = false
      }

      if(!flag) toReturn.push(line)
    }
  )
  writeFileSync(
    `${__dirname}/allFailingTests.txt`, 
    toReturn.join('\n')
  )
}

prove('equals')
