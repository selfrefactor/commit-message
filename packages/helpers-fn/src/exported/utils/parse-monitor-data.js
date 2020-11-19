const { map, toDecimal } = require('rambdax')

function parseMonitorData({
  initialState,
  highestProcessUsage,
  highestMemoryUsage,
  cycles
}){
  const total = cycles.reduce((prev, cycle) => {
    if(prev.memoryUsage === undefined) return cycle

    return {
      memoryUsage: prev.memoryUsage + cycle.memoryUsage,
      processUsage: prev.processUsage + cycle.processUsage,
    }
  }, {})
  const avarages = map(
    x => toDecimal(x/cycles.length, 3),
    total
  )
  const diff = {
    memory: toDecimal(initialState.memoryUsage - highestMemoryUsage, 3), 
    memoryAverage: toDecimal(initialState.memoryUsage - avarages.memoryUsage, 3), 
    processAvarage: toDecimal(avarages.processUsage - initialState.processUsage, 1), 
    process: toDecimal(highestProcessUsage - initialState.processUsage,1), 
  }

  return {
    diff,
    avarages,
    initial: initialState
  }
}

exports.parseMonitorData = parseMonitorData