const {playwrightInit} = require('playwright-init')
const {wrap} = require('./src/playwright-wrap')
const {mapAsync} = require('rambdax')
const GITHUB = 'https://github.com'
const FACEBOOK = 'https://facebook.com'

async function executeTest(){
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

executeTest()