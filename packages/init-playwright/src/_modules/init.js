const playwright = require('playwright')
const { getSettings } = require('./getSettings')

const SUPPORTED_BROWSERS = [ 'chromium', 'firefox' ]

const deviceKey = 'iPhone 11'

async function getContext(browser, mobileFlag){
  if (!mobileFlag){
    return browser.newContext()
  }
  const iPhone = playwright.devices[ deviceKey ]

  return browser.newContext({ ...iPhone })
}

async function init(input, extraProps = {}){
  const browserTypeInput = SUPPORTED_BROWSERS.includes(input.browser) ?
    input.browser :
    'chromium'

  const browserType = input.mobile ? 'chromium' : browserTypeInput
  const settings = getSettings(input, extraProps)
  const browser = await playwright[ browserType ].launch(settings)
  const context = await getContext(browser, input.mobile)
  const page = await context.newPage()

  if (!input.mobile){
    await page.setViewportSize({
      height : input.resolution.y,
      width  : input.resolution.x,
    })
  }

  return {
    browser,
    page,
  }
}

exports.init = init
