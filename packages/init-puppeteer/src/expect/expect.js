const { constantCase } = require('string-fn')
const { endsWith } = require('./endsWith')
const { equals } = require('rambdax')
const { greater } = require('./greater')
const { log } = require('helpers-fn')
const { startsWith } = require('./startsWith')
const { toBe } = require('./toBe')

const modes = {
  greaterThan : greater,
  greater,
  endsWith,
  startsWith,
  toBe,
}
const modesKeys = Object.keys(modes)

function expectSimple(
  result, expected, label = 'NO_LABEL'
){
  if (!equals(expected, result)){
    console.log({
      expected,
      result,
    })
    throw new Error(label)
  }

  log(constantCase(label), 'success')
}

function expectComplex(
  result, mode, expected, label
){
  const testResult = modes[ mode ](result, expected)

  if (!testResult){
    console.log({
      expected,
      result,
    })
    throw new Error(label)
  }

  log(constantCase(label), 'success')
}

function expect(
  result, expected, label, complexLabel
){
  if (modesKeys.includes(expected)){
    return expectComplex(
      result, expected, label, complexLabel
    )
  }

  expectSimple(
    result, expected, label
  )
}

exports.expect = expect
