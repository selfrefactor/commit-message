const playwright = require('playwright')
const { getSettings } = require('./getSettings')
const { ok } = require('rambdax')

const SUPPORTED_BROWSERS = [ 'chromium', 'firefox' ]
const deviceKey = 'iPhone 11'
const Good3G = {
  offline            : false,
  downloadThroughput : 1.5 * 1024 * 1024 / 8,
  uploadThroughput   : 750 * 1024 / 8,
  latency            : 40,
}

async function getContext(
  browser, mobileFlag, httpAuth
){
  if (!mobileFlag && !httpAuth){
    return browser.newContext()
  }

  if (!mobileFlag && httpAuth){
    ok(httpAuth)({
      username : String,
      password : String,
    })

    return browser.newContext({
      httpCredentials : {
        username : httpAuth.username,
        password : httpAuth.password,
      },
    })
  }
  const iPhone = playwright.devices[ deviceKey ]

  if (!httpAuth){
    return browser.newContext({ ...iPhone })
  }

  ok(httpAuth)({
    username : String,
    password : String,
  })

  return browser.newContext({
    ...iPhone,
    httpCredentials : {
      username : httpAuth.username,
      password : httpAuth.password,
    },
  })
}

async function init(input, extraProps = {}){
  const browserTypeInput = SUPPORTED_BROWSERS.includes(input.browser) ?
    input.browser :
    'chromium'

  const browserType = input.mobile ? 'chromium' : browserTypeInput
  const settings = getSettings(input, extraProps)
  const browser = await playwright[ browserType ].launch(settings)
  const context = await getContext(
    browser, input.mobile, input.httpAuth
  )
  const page = await context.newPage()

  if (input.slowNetwork && browserType === 'chromium'){
    const client = await context.newCDPSession(page)
    await client.send('Network.enable')
    client.send('Network.emulateNetworkConditions',
      input.slowNetwork === true ? Good3G : input.slowNetwork)
  }

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
