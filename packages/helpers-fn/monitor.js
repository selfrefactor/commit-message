const {exec, log} = require('helpers-fn')
const {toDecimal,delay, setter, getter} = require('rambdax')

const BUSY = 'busy.flag'

async function notifyOS(message){
  if(getter(BUSY)) return
  setter(BUSY, true)
  await exec({
    cwd: __dirname,
    command: `notify-send '${message}' --icon=dialog-information`
  })
  await delay(10000)
  setter(BUSY, false)
}

function showFreeMemory(event){
  const freeMemory = toDecimal(event.freemem/1000000000)
  console.log(event.loadavg)
  if(freeMemory < 0.9){
    return notifyOS('Lack of free memory')
  }

  if(freeMemory < 1.7){
    log(`Free memory ${freeMemory}`, 'big')
  }
}

const monitor = require("os-monitor");
monitor.start();
 
// define handler that will always fire every cycle
monitor.on('monitor', showFreeMemory);
 
monitor.on('loadavg1', (event) => {
  console.log(event.type, 'Load average is exceptionally high!');
});