import { initPlaywright, attach } from "../src/init-playwright.js"

const GITHUB = 'https://github.com'

export async function foo(){
  const browserMode = 'chromium'
  const { browser, page } = await initPlaywright({
    browser       : browserMode,
    url           : GITHUB,
    waitCondition : {
      timeout   : 5800,
      waitUntil : 'networkidle',
    },
  })
  const _ = attach(page, browserMode)

  const executeTest = async () => {
    const allClassNames = await _.getAllClassNames('div')
    return allClassNames
  }
  
  return {executeTest, _, browser}
}