const playwright = require('playwright')
const { getSettings } = require('./getSettings')

const iPhone = playwright.devices[ 'iPhone 6' ]
const SUPPORTED_BROWSERS = [ 'chromium', 'firefox', 'webkit' ]

async function init(input, extraProps = {}){
  const browserType = SUPPORTED_BROWSERS.includes(input.browser) ?
    input.browser :
    'firefox'

  const settings = getSettings(input, extraProps)
  const browser = await playwright[ browserType ].launch(settings)
  const context = await browser.newContext()
  const page = await context.newPage()
  await page.setViewportSize({
    height : input.resolution.y,
    width  : input.resolution.x,
  })

  if (input.mobile) await page.emulate(iPhone)

  return {
    browser,
    page,
  }
}

exports.init = init
