const R = require('rambda')
const { findFailingTests } = require('./findFailingTests.js')
const { getIndent, indent } = require('string-fn')
const { readFileSync, writeFileSync, existsSync } = require('fs')
const { remove, replace, take } = require('rambdax')
const { resolve } = require('path')
const BASE = resolve(__dirname, '../')

const getOutputPath = x => `${ BASE }/outputs/${ x }.txt`
const getTestPath = x => `${ BASE }/ramda/test/${ x }.js`

function withSingleMethod(method){
  const outputPath = getOutputPath(method)
  if (!existsSync(outputPath)) return

  const content = readFileSync(
    outputPath
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
  const holder = []

  testContent.split('\n').forEach(
    line => {
      if (line.includes(goodTests[ counter ])){
        indentCount = getIndent(line)

        return flag = true
      }
      if (line === `${ indent('});', indentCount) }`){
        counter++

        if (!flag) holder.push(line)

        return flag = false
      }

      if (!flag) {
        const lineToPush = line.includes('../source') ? 
          replace('../source', 'rambda', line) : 
          line

        holder.push(lineToPush)
      }
    }
  )
  let skipFirstEmptyLine = true

  const toReturn = holder.filter(x => {
    if(!x && skipFirstEmptyLine){
      skipFirstEmptyLine = false
      return true
    }
    return x
  })

  writeFileSync(
    `${ __dirname }/failing_tests/${ method }.js`,
    toReturn.join('\n')
  )

  return {
    method,
    content : toReturn.join('\n'),
  }
}
 
async function recordFailingTests(){
  // await findFailingTests(true)

  const allMethods = Object.keys(R).filter(x => x !== 'partialCurry')
  // const allMethods = take(9,Object.keys(R).filter(x => x !== 'partialCurry'))
  // const allMethods = [ 'adjust' ]

  const allFailingTests = allMethods
    .map(method => withSingleMethod(method))
    .filter(Boolean)
  let summary = ''

  allFailingTests.forEach(({ content, method }) => {
    const toAdd = `> ${ method }\n\n\`\`\`javascript\n${ content }\n\`\`\`\n\n`

    summary += toAdd
  })
  writeFileSync(
    `${ __dirname }/failing_tests/_SUMMARY.md`,
    summary
  )
}

recordFailingTests()
