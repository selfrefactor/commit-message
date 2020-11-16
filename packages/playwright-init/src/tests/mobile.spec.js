import { playwrightInit } from '../playwright-init'
import {wrap} from 'playwright-wrap'
const REDDIT = 'https://reddit.com'
const GITHUB = 'https://github.com'

jest.setTimeout(30000)

test('local', async () => {
  try {
    var { browser, page } = await playwrightInit({
      headless      : false,
      logFlag       : false,
      mobile        : true,
      url           : REDDIT,
      waitCondition : 'load',
    })
    const _ = wrap(page)

    const allClassNames = await _.getAllClassNames('div')
    expect(allClassNames.length).toBeGreaterThan(20)
    await browser.close()
  } catch (error){
    console.log(error)
    await browser.close()
  }
})

test('reddit', async () => {
  try {
    var { browser, page } = await playwrightInit({
      headless      : false,
      logFlag       : false,
      mobile        : true,
      url           : REDDIT,
      waitCondition : {
        timeout   : 5000,
        waitUntil : 'domcontentloaded',
      },
    })
    const _ = wrap(page)

    const text = await _.page.$$(
      'div', _.its, 'innerHTML'
    )
    expect(text.length).toBeGreaterThan(0)
    await browser.close()
  } catch (error){
    console.log(error)
    await browser.close()
  }
})

test('github', async () => {
  try {
    var { browser, page } = await playwrightInit({
      headless      : false,
      logFlag       : false,
      mobile        : true,
      url           : GITHUB,
      waitCondition : 'load',
      // waitCondition :'domcontentloaded'
      // waitCondition :'networkidle'
    })
    const foo = await page.$('foo')
    expect(foo).toBeNull()
    await browser.close()
  } catch (error){
    console.log(error)
    await browser.close()
  }
})
