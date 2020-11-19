const { delay, toDecimal, piped, split, last, head, map, trim } = require('rambdax')
const { ms } = require('string-fn')
const { exec } = require('./exec')
var osu = require('node-os-utils')
 
async function getProcessUsage(){
  const cpuUsage = await osu.cpu.usage()
  return cpuUsage
}  

async function getMemoryUsage(){
  const [freeMemoryData] = await exec({
    cwd: __dirname,
    command: 'free',
    onLog: () => {}
  })
  const freeMemory = piped(
    freeMemoryData,
    split('Mem:'),
    last,
    split('Swap:'),
    head,
    split(' '),
    map(trim),
    last,
    Number
  )
  return toDecimal(freeMemory/1000000, 1)
}

class Monitor{
  constructor(seconds = 5){
    this.highestMemoryUsage = Infinity
    this.highestProcessUsage = 0
    this.cycles = []
    this.stopFlag = false
    this.initialState = {}
    this.tick = ms(`${seconds} seconds`)
  }
  async setInitialState(){
    const [memoryUsage, processUsage] = await Promise.all([
      getMemoryUsage(),
      getProcessUsage()
    ])
    this.initialState = {memoryUsage, processUsage}
  }
  async applyStart(){
    await delay(this.tick)
    while(!this.stopFlag){
      await Promise.all([
        this.onEveryTick(),
        delay(this.tick)
      ])
    }
  }
  async start(){
    await this.setInitialState()
    this.applyStart()
  }

  async onEveryTick(){
    const [memoryUsage, processUsage] = await Promise.all([
      getMemoryUsage(),
      getProcessUsage()
    ])
    this.cycles.push({memoryUsage, processUsage})
    if(memoryUsage < this.highestMemoryUsage){
      this.highestMemoryUsage = memoryUsage
    }
    
    if(processUsage > this.highestProcessUsage){
      this.highestProcessUsage = processUsage
    }
  }
  async stopMonitor(){
    this.stopFlag = true
    await delay(this.tick)
    return {
      initialState: this.initialState,
      highestProcessUsage: this.highestProcessUsage,
      highestMemoryUsage: this.highestMemoryUsage,
      cycles: this.cycles,
      // averageMemoryUsage: undefined,
      // averageProcessUsage: undefined
    }
  }
  async stop(){
    const monitorData = await this.stopMonitor()
    return monitorData
  }
}

exports.Monitor = Monitor
exports.monitor = new Monitor()
exports.getMemoryUsage = getMemoryUsage
exports.getProcessUsage = getProcessUsage