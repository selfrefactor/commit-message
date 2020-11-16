import { playwrightInit, playwrightRun } from '../playwright-init'
import {wrap} from 'playwright-wrap'
const GITHUB = 'https://github.com'
const FACEBOOK = 'https://facebook.com'

jest.setTimeout(60000)

const RUN_CHROME_ONLY = process.env.RUN_CHROME === 'ON'
const RUN_FIREFOX_ONLY = process.env.RUN_FIREFOX === 'ON'

async function executeTest(browserMode){
  const { browser, page } = await playwrightInit({
    headless : false,
    logFlag  : false,
    browser  : browserMode,
    url      : FACEBOOK,
  })

  try {
    const _ = wrap(page)

    const allClassNames = await _.getAllClassNames('div')
    expect(allClassNames.length).toBeGreaterThan(30)
    await browser.close()
  } catch (e){
    console.log(e)
    await browser.close()
    expect(0).toBeTruthy()
  }
}

test('chromium', async () => {
  if (RUN_FIREFOX_ONLY) return
  await executeTest('chromium')
})

test('firefox', async () => {
  if (RUN_CHROME_ONLY) return
  await executeTest('firefox')
})

test('wrap playwright', async () => {
  const fn = async _ => {
    return await _.count('div')
  }
  const result = await playwrightRun({url:GITHUB, fn, fallback: -1})
  expect(result).toBeGreaterThan(100)
})
