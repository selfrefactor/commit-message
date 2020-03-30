const sampleTestOutput = `{"numFailedTestSuites":0,"numFailedTests":12,"numPassedTestSuites":119,"numPassedTests":294,
"numPendingTestSuites":0,"numPendingTests":0,"numRuntimeErrorTestSuites":0,"numTodoTests":0,"numTotalTestSuites":119,"numTotalTests":294,"openHandles":[],"snapshot":{"added":0,"didUpdate":false,"failure":false,"filesAdded":0,"filesRemoved":0,"filesRemovedList":[],"filesUnmatched":0,"filesUpdated":0,"matched":0,"total":0,"unchecked":0,"uncheckedKeysByFile":`

const { parseTestOutput } = require('./parseTestOutput.js')

test('happy', () => {
  const result = parseTestOutput(sampleTestOutput)
  expect(result).toEqual({ numFailedTests : 12 })
})

test('bad input', () => {
  const result = parseTestOutput('')
  expect(result).toEqual({})
})
