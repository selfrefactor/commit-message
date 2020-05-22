import { attach, initPlaywright } from '../index.js'
const REDDIT = 'https://reddit.com'
const LOCAL = 'http://helpkarma.l:3000'
const GITHUB = 'https://github.com'

jest.setTimeout(30000)

test('local', async () => {
  try {
    var { browser, page } = await initPlaywright({
      headless      : false,
      logFlag       : false,
      mobile        : true,
      url           : LOCAL,
      waitCondition : {
        timeout   : 5000,
        waitUntil : 'load',
      },
    })
    const _ = attach(page)

    const text = await _.$$(
      'div', _.its, 'innerHTML'
    )
    expect(text.length).toBeGreaterThan(0)
    await browser.close()
  } catch (error){
    console.log(error)
    await browser.close()
  }
})

test('reddit', async () => {
  try {
    var { browser, page } = await initPlaywright({
      headless      : false,
      logFlag       : false,
      mobile        : true,
      url           : REDDIT,
      waitCondition : {
        timeout   : 5000,
        waitUntil : 'domcontentloaded',
      },
    })
    const _ = attach(page)

    const text = await _.$$(
      'div', _.its, 'innerHTML'
    )
    expect(text.length).toBeGreaterThan(0)
    await browser.close()
  } catch (error){
    console.log(error)
    await browser.close()
  }
})

test.skip('github', async () => {
  try {
    var { browser, page } = await initPlaywright({
      headless      : false,
      logFlag       : false,
      mobile        : true,
      url           : GITHUB,
      waitCondition : {
        timeout   : 5000,
        waitUntil : 'load',
      },
    })
    const _ = attach(page)

    const text = await _.$$(
      'div', _.its, 'innerHTML'
    )
    expect(text.length).toBeGreaterThan(0)
    await browser.close()
  } catch (error){
    console.log(error)
    await browser.close()
  }
})
