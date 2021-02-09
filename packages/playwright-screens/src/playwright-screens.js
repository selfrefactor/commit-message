const {playwrightInit} = require('playwright-init')
const {wrap} = require('playwright-wrap')
const {log} = require('helpers-fn')
const { mapAsync, delay } = require('rambdax')

const SCREENS = [
  {label: 'tiny', screen: {x: 1024, y: 768}},
  {label: 'smaller', screen: {x: 1280, y: 720}},
  {label: 'small', screen: {x: 1366, y: 768}},
  {label: 'medium', screen: {x: 1600, y: 900}},
  {label: 'big', screen: {x: 1920, y: 1080}},
  {label: 'huge', screen: {x: 2256, y: 1504}},
]

async function snap({url, screen, label, waitForReady,waitForTime, screensDir}) {
  log(label, 'info')
  const {browser, page} = await playwrightInit({
    resolution: screen,
    headless: true,
    logFlag: false,
    browser: 'chromium',
    url,
  })
  try {
    const _ = wrap(page, screensDir)

    if(waitForReady) await waitForReady(_)
    if(!waitForReady) await delay(waitForTime)

    await _.snap(label)
    await browser.close()
    return true
  } catch (error) {
    console.log(error, 'try.catch')
    await browser.close()
    return false
  }
}

async function playwrightScreens({
  url,
  screens,
  waitForTime = 2000,
  waitForReady = null,
  screensDir = `${process.cwd()}/screens`
}){
  await mapAsync(async ({screen,label}) => {
    await snap({url, waitForTime, screen, label, waitForReady, screensDir})
  }, screens ? screens :  SCREENS)
}

exports.playwrightScreens = playwrightScreens
