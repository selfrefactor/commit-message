import { attach, initPlaywright } from '../index.js'
import { delay } from 'rambdax'
const GITHUB = 'https://github.com'
jest.setTimeout(30000)

test('happy', async () => {
  const { browser, page } = await initPlaywright({
    headless      : false,
    logFlag       : false,
    url           : GITHUB,
    waitCondition : {
      timeout   : 5800,
      waitUntil : 'networkidle',
    },
  })  

  try {
   const _ = attach(page)

   const text = await _.$$(
     'div', _.its, 'innerHTML'
   )
   expect(text.length).toBeGreaterThan(50)
   await delay(15000)
   await browser.close()
  } catch (error){
    await browser.close()
  }
})
