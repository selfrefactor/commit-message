import { exec } from './exec'
import { normalizeError } from './normalizeError'
import { delay } from 'rambdax'
import { log } from 'log'

async function gtmetrixPollCURL(command: string): Promise<any> {
  try {
    const cwd = process.cwd()
    const [resultRaw] = await exec({ command, cwd })
    const result: Object = JSON.parse(resultRaw)

    return result
  } catch (err) {
    throw new Error(normalizeError(err))
  }
}

export async function gtmetrixPoll(gtmetrixPollCommand: string): Promise<any> {
  try {
    let status = ''
    let result: any = {}
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
  } catch (err) {
    throw new Error(normalizeError(err))
  }
}
