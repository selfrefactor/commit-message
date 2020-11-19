const {playwrightInit} = require('playwright-init')
const {wrap} = require('./src/playwright-wrap')
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
  const divs = await _.count('div')
  console.log({divs})
}

executeTest()