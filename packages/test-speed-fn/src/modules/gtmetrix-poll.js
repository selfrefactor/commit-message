const { exec } = require('./exec') 
const { log } = require('helpers-fn')
const { delay } = require('rambdax')

async function gtmetrixPollCURL(command){
  const cwd = process.cwd()
  const [resultRaw] = await exec({ command, cwd })
  const result = JSON.parse(resultRaw)

  return result
}

async function gtmetrixPoll(gtmetrixPollCommand) {
    let status = ''
    let result = {}
    let counter = 0

    while (status !== 'completed') {
      const commandResult = await gtmetrixPollCURL(gtmetrixPollCommand)
      status = commandResult.state
      result = commandResult.results
      
      const ms = status === 'queued' ?
        3000 :
        0

      log(counter*3, 'seconds waiting for gtmetrix',`status: '${status}'` ,'info')
      counter++
      await delay(ms)
    }

    return {
      onLoad: result.onload_time,
      firstPaint: result.first_paint_time,
      domInteractive: result.dom_interactive_time,
      fullyLoaded: result.fully_loaded_time,
      pageLoadTime: result.page_load_time,
      yslowScore: result.yslow_score,
      pagespeedScore: result.pagespeed_score,
    }
}

exports.gtmetrixPoll = gtmetrixPoll