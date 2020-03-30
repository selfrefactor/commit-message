const { match, remove } = require('rambdax')

function parseTestOutput(testOutput){
  const [ matched ] = match(/numFailedTests":[0-9]+/, testOutput)
  if (!matched) return {}

  return { numFailedTests : Number(remove('numFailedTests":', matched)) }
}

exports.parseTestOutput = parseTestOutput
