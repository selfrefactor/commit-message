// process.env.DEBUG='pw:browser*'
const { attach: attachModule } = require('./attach')
const { headless } = require('./_modules/headless')
const { init } = require('./_modules/init')
const { type, pass } = require('rambdax')
const LONG_TIMEOUT = 60000
const SUPPORTED_WAIT_CONDITIONS = [ 'load', 'domcontentloaded', 'networkidle' ]

const defaultWaitCondition = {
  timeout   : LONG_TIMEOUT,
  waitUntil : 'networkidle',
}

const defaultURL = 'about:blank'
const defaultResolution = {
  x : 1366,
  y : 768,
}
const mobileResolution = {
  x : 400,
  y : 820,
}

const defaultInput = {
  headless      : true,
  logFlag       : false,
  resolution    : defaultResolution,
  url           : defaultURL,
  waitCondition : defaultWaitCondition,
}

function getDefaultInput(mobile){
  if (!mobile) return defaultInput

  return {
    ...defaultInput,
    resolution : mobileResolution,
  }
}

function logMethod(input){
  if (input._type === 'log'){
    console.log(input._text)
  }
}

function getWaitCondition(waitCondition){
  const typeIs = type(waitCondition)

  if (typeIs === 'Object'){
    const okCondition = pass({
      timeout   : Number,
      waitUntil : SUPPORTED_WAIT_CONDITIONS,
    })
    if (okCondition) return waitCondition

    return defaultWaitCondition
  }

  if (typeIs === 'String'){
    if (SUPPORTED_WAIT_CONDITIONS.includes(waitCondition)){
      return {
        waitUntil : waitCondition,
        timeout   : LONG_TIMEOUT,
      }
    }

    return defaultWaitCondition
  }

  if (typeIs !== 'Number') return defaultWaitCondition

  return {
    waitUntil : 'networkidle',
    timeout   : waitCondition,
  }
}

async function initPlaywright(inputRaw){
  const headlessBase = headless() ? {} : { headless : false }

  const input = {
    ...getDefaultInput(inputRaw.mobile),
    ...inputRaw,
    ...headlessBase,
  }
  const { browser, page } = await init(input, inputRaw.extraProps)

  const waitCondition = getWaitCondition(input.waitCondition)
  await page.goto(input.url, waitCondition)

  if (input.logFlag) page.on('console', logMethod)

  return {
    browser,
    page,
  }
}

exports.initPlaywright = initPlaywright
exports.attach = attachModule
