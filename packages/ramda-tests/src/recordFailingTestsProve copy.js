const R = require('rambda')
const { emptyDirSync, copySync } = require('fs-extra')
const { findFailingTests } = require('./findFailingTests.js')
const { getIndent, indent } = require('string-fn')
const { readFileSync, writeFileSync, existsSync } = require('fs')
const { remove, replace, take, map, filter, piped } = require('rambdax')
const { resolve } = require('path')
const BASE = resolve(__dirname, '../')

const getOutputPath = x => `${ BASE }/outputs/${ x }.txt`
const getTestPath = x => `${ BASE }/ramda/test/${ x }.js`

function withSingleMethod(method){
  const outputPath = getOutputPath(method)
  if (!existsSync(outputPath)) return

  const content = readFileSync(outputPath).toString()
  const testContent = readFileSync(getTestPath(method)).toString()
  const [ sk ] = content.split('passing')
  const goodTests = sk
    .split('\n')
    .filter(line => line.includes('✓'))
    .map(line => remove('✓', line).trim())

  // console.log({goodTests})

  const badTests = piped(
    content.split('passing'),
    ([ first ]) => first,
    x => x.split('\n'),
    filter(x => x.includes(')')),
    map(x => x.split(')')[ 1 ].trim())
  )

  let flag = false
  let isGoodCounter = undefined
  let counter = 0
  let counterGood = 0
  let indentCount = 0
  const holder = []

  testContent.split('\n').forEach(line => {
    // console.log(counter, badTests[ counter ], line)

    const includeBadTests =
      badTests[ counterGood ] && line.includes(badTests[ counter ])
    const includeGoodTests =
      goodTests[ counterGood ] && line.includes(goodTests[ counterGood ])

    // if (includeBadTests) console.log({ bad : line })
    if (includeGoodTests) console.log({ good : line })
    // if(line.includes(`it('`)) console.log(line)

    if (includeGoodTests){
      // if(line.includes(`it('`)) console.log(line)
      indentCount = getIndent(line)
      isGoodCounter = true

      return flag = false
    }

    if (includeBadTests){

      indentCount = getIndent(line)
      isGoodCounter = false

      return flag = true
    }

    if (line === `${ indent('});', indentCount) }`){
      if (isGoodCounter){
        counterGood++
      } else {
        counter++
      }

      // if (!flag) return
      if (!flag) holder.push(line)

      // console.log(line)
      return flag = false
    }

    if (!flag){
      const lineToPush = line.includes('../source') ?
        replace('../source', 'rambda', line) :
        line

      // holder.push(lineToPush)
    }
    // if(line.includes(`it('`)) console.log(line)
    // console.log(line)
  })
  let skipFirstEmptyLine = true

  const toReturn = holder.filter(x => {
    if (!x && skipFirstEmptyLine){
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
  const dir = `${ __dirname }/failing_tests`
  // emptyDirSync(dir)
  // await findFailingTests(true)

  // const allMethods = Object.keys(R).filter(x => x !== 'partialCurry')
  // const allMethods = take(9,Object.keys(R).filter(x => x !== 'partialCurry'))
  const allMethods = [ 'isEmpty' ]

  const allFailingTests = allMethods
    .map(method => withSingleMethod(method))
    .filter(Boolean)
  let summary = ''

  allFailingTests.forEach(({ content, method }) => {
    const toAdd = `> ${ method }\n\n\`\`\`javascript\n${ content }\n\`\`\`\n\n`

    summary += toAdd
  })
  writeFileSync(`${ dir }/_SUMMARY.md`, summary)

  const ramdaDir = resolve(
    __dirname,
    '../../../../rambda/files/failing_ramda_tests'
  )
  copySync(dir, ramdaDir)
}

recordFailingTests()
