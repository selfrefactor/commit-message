const { delay } = require('rambdax')
const { ms } = require('string-fn')

class Monitor{
  constructor(seconds = 5){
    this.highestMemoryUsage = undefined
    this.highestProcessUsage = undefined
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
    }
  }

  async onEveryTick(){
    console.log('foo')
  }
  async stopMonitor(){
    this.stopFlag = true
    await delay(this.tick)
    return {
      highestProcessUsage: this.highestProcessUsage,
      highestMemoryUsage: this.highestMemoryUsage,
      averageMemoryUsage: undefined,
      averageProcessUsage: undefined
    }
  }
  async stop(){
    const monitorData = await this.stopMonitor()
    console.log({monitorData})
  }
}

exports.Monitor = Monitor
exports.monitor = new Monitor()