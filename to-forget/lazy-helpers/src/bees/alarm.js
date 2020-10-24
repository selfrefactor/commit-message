import { range, allTrue, delay } from 'rambdax'
import { takeArguments } from 'string-fn'
import { logAnt } from '../ants/log'
import ms from 'ms'

const click = () => {
  const el = document.querySelector('.ytp-play-button')
  if (el === null) return logAnt('alarm.click')

  el.click()
}

const delayList = alarm => {
  // 1h for each alarm integer
  // ============================================
  const base = ms(`${ alarm }h`)

  // Wait 15 minutes, 30 minutes and so on
  // ============================================
  const step = 15

  // Play for 20 seconds, 40 seconds and so on
  // ============================================
  const stopStep = 20

  return range(1, 5).map(i => ({
    step     : i === 1 ? base : ms(`${ (i - 1) * step }m`),
    stopStep : ms(`${ i * stopStep }s`),
  }))
}

export async function alarmBee(){
  const url = window.location.href
  const ok = allTrue(
    url.includes('youtube.com'),
    url.includes('alarm=')
  )
  if (!ok) return

  const { alarm } = takeArguments(url, '#')
  console.log({alarm})
  
  for (const x of delayList(alarm)){
    console.log(x)
    await delay(x.step)
    click()
    console.log('PLAY')

    await delay(x.stopStep)
    click()
    console.log('PAUSE')
  }
}
