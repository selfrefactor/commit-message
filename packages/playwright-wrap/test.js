const {playwrightInit} = require('playwright-init')
const {wrap} = require('./src/playwright-wrap')
const {mapAsync} = require('rambdax')
const GITHUB = 'https://github.com'
const FACEBOOK = 'https://facebook.com'

void async function executeTest(){
  const { browser, page } = await playwrightInit({
    headless : false,
    logFlag  : false,
    browser  : 'chromium',
    url      : FACEBOOK,
  })
  const _ = wrap(page)
  const els = await _.queryAll('div')

  const allTexts = await mapAsync(
    async el => {
      return await el.text()
    },
    els
  )
  console.log({allTexts})
  const divs = await _.count('div')
  console.log({divs})

  await browser.close()
}

void async function foo(){
  const url  ='https://chordu.com/chords-tabs-freddie-king-sweet-home-chicago-id_pSAz_lVLIJo'
  const DURATION = '#durationViewer'
  
  const { browser, page } = await playwrightInit({
    headless : false,
    logFlag  : false,
    browser  : 'chromium',
    url      ,
  })
  const _ = wrap(page)
  const el = await page.$('#playerCtrlPlay')
  await _.clickWithText('Consent')
  await el.click({force: true})
  await _.sleep()
  const els = await _.queryAll('div')
 // #cb_active
  const allTexts = await mapAsync(
    async el => {
      return await el.text()
    },
    els
  )
  console.log({allTexts})
  const divs = await _.count('div')
  console.log({divs})

  await browser.close()
}()