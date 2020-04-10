const { attach: attachModule } = require('./attach')
const { expect: expectModule } = require('./expect/expect')
const { headless } = require('./_modules/headless')
const { init } = require('./_modules/init')
const LONG_TIMEOUT = 60000
const TIMEOUT = 5000
const SHORT_TIMEOUT = 100

const waitForNetwork = {
  timeout   : LONG_TIMEOUT,
  waitUntil : 'networkidle0',
}

const getWaitCondition = condition => ({
  timeout   : LONG_TIMEOUT,
  waitUntil : condition,
})

const waitForTimeout = ms => ({
  timeout   : ms,
  waitUntil : 'networkidle0',
})

const defaultURL = 'about:blank'
const webpackURL = 'http://localhost:8080'
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
  waitCondition : waitForNetwork,
}

function getDefaultInput(mobile){
  if (!mobile) return defaultInput

  return {
    ...defaultInput,
    resolution : mobileResolution,
  }
}

function getWait(url, waitCondition){
  const urlFlag =
    url === defaultURL ?
      waitForTimeout(SHORT_TIMEOUT) :
      url === webpackURL ?
        waitForTimeout(TIMEOUT) :
        false

  if (urlFlag === false && waitCondition === undefined){
    return waitForNetwork
  }

  if (typeof waitCondition === 'string'){
    const conditionMap = {
      DOM     : 'domcontentloaded',
      LOAD    : 'load',
      NETWORK : 'networkidle0',
    }

    const answer = conditionMap[ waitCondition ] === undefined

    const condition = answer ? 'load' : conditionMap[ waitCondition ]

    return getWaitCondition(condition)
  }

  return waitCondition
}

function logMethod(input){
  if (input._type === 'log'){
    console.log(input._text)
  }
}

async function initPuppeteer(inputRaw){
  const headlessBase = headless() ? {} : { headless : false }

  const input = {
    ...getDefaultInput(inputRaw.mobile),
    ...inputRaw,
    ...headlessBase,
  }
  const { browser, page } = await init(input, inputRaw.extraProps)

  const wait = getWait(input.url, input.waitCondition)

  await page.goto(input.url, wait)

  if (input.logFlag) page.on('console', logMethod)

  return {
    browser,
    page,
  }
}

exports.expect = expectModule
exports.initPuppeteer = initPuppeteer
exports.waitForTimeout = waitForTimeout
exports.waitForNetwork = waitForNetwork
exports.LONG_TIMEOUT = LONG_TIMEOUT
exports.SHORT_TIMEOUT = SHORT_TIMEOUT
exports.TIMEOUT = TIMEOUT
exports.attach = attachModule
