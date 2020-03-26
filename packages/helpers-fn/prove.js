const { delay } = require('rambdax')
const { startLoadingBar, stopLoadingBar } = require('./src/exported/loadingBarCLI')

void async function test(){
  startLoadingBar({
    stopAfter : 10000,
    symbol    : '=02',
  })
  await delay(7000)
  stopLoadingBar()
}()
