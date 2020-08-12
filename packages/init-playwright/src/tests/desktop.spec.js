import { attach, initPlaywright } from '../init-playwright'
const GITHUB = 'https://github.com'
jest.setTimeout(30000)

async function executeTest(browserMode){
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
  } catch (e){
    console.log(e)
    await browser.close()
    expect(0).toBeTruthy()
  }
}

test('chromium', async () => {
  await executeTest('chromium')
})

test.only('firefox', async () => {
  await executeTest('firefox')
})
