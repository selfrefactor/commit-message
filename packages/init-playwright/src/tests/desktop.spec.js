import { attach, initPlaywright } from '../index'
const GITHUB = 'https://github.com'
jest.setTimeout(30000)

test('happy', async () => {
  const { browser, page } = await initPlaywright({
    headless      : false,
    logFlag       : false,
    browser       : 'firefox',
    url           : GITHUB,
    waitCondition : {
      timeout   : 5800,
      waitUntil : 'networkidle',
    },
  })

  try {
    const _ = attach(page)

    const foo = await page.$$('.foo')
    console.log(foo)
    // const text = await _.$$(
    //   'div', _.its, 'innerHTML'
    // )
    expect(text.length).toBeGreaterThan(50)
    await browser.close()
  } catch (error){
    await browser.close()
  }
})
