import { attach, initPlaywright } from '../index'
const GITHUB = 'https://github.com'
jest.setTimeout(30000)

test('happy', async () => {
  // const browserMode = 'firefox'
  const browserMode = 'chromium'
  const { browser, page } = await initPlaywright({
    headless      : false,
    logFlag       : false,
    browser       : browserMode,
    slowNetwork   : true,
    url           : GITHUB,
    waitCondition : {
      timeout   : 5800,
      waitUntil : 'networkidle',
    },
  })

  try {
    const _ = attach(page, browserMode)

    const allClassNames = await _.getAllClassNames('div')
    expect(allClassNames.length).toBeGreaterThan(50)
    await browser.close()
  } catch (error){
    await browser.close()
  }
})
