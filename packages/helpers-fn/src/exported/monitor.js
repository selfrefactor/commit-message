const { delay, toDecimal } = require('rambdax')
const { ms } = require('string-fn')
const { exec } = require('./exec')
var osu = require('node-os-utils')
 
async function getProcessUsage(){
  const cpuUsage = await osu.cpu.usage()
  return cpuUsage
}  

async function getMemoryUsage(){
  const command= `free | awk '/^Mem/ { a=(($4+$7)/$2 * 100); print a  }'`
  const [freeMemory] = await exec({
    cwd: __dirname,
    command,
    onLog: () => {}
  })
  return 100 - toDecimal(freeMemory.trim(), 0)
}

class Monitor{
  constructor(seconds = 5){
    this.highestMemoryUsage = 0
    this.highestProcessUsage = 0
    this.cycles = []
    this.stopFlag = false
    this.tick = ms(`${seconds} seconds`)
  }
  async start(){
    while(!this.stopFlag){
      await Promise.all([
        this.onEveryTick(),
        delay(this.tick)
      ])
      console.log(1)
    }
  }

  async onEveryTick(){
    const [memoryUsage, processUsage] = await Promise.all([
      getMemoryUsage(),
      getProcessUsage()
    ])
    this.cycles.push({memoryUsage, processUsage})
    if(memoryUsage > this.highestMemoryUsage){
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
      highestProcessUsage: this.highestProcessUsage,
      highestMemoryUsage: this.highestMemoryUsage,
      averageMemoryUsage: undefined,
      cycles: this.cycles,
      averageProcessUsage: undefined
    }
  }
  async stop(){
    const monitorData = await this.stopMonitor()
    console.log({monitorData})
    return monitorData
  }
}

exports.Monitor = Monitor
exports.monitor = new Monitor()
exports.getMemoryUsage = getMemoryUsage
exports.getProcessUsage = getProcessUsage