const { delay, type, range, pass, waitFor: waitForMethod } = require('rambdax')

const STEP_DELAY = Number(process.env.STEP_DELAY || '0')
const CAN_SNAP = process.env.PLAYWRIGHT_SNAP !== 'OFF'
const DELAY = 200

const normalizeInput = input =>
  input.index === undefined ? {
    ...input,
    index : 0,
  } : input

const extractText = ({ textContent }) => textContent

const helpers = { extractText }

function attach(page, screenDir = process.cwd()){
  const $ = async (selector, fn, ...args) => {
    const okSelector = await page.$(selector)
    if (!okSelector) return null

    const result = await page.$eval(
      selector, fn, ...args
    )
    await delay(STEP_DELAY)

    return result
  }

  const $$ = async (selector, fn, ...args) => {
    const okSelector = await page.$(selector)
    if (okSelector.length === 0) return null

    const result = await page.$$eval(
      selector, fn, ...args
    )
    await delay(STEP_DELAY)

    return result
  }
  const evalFn = async (inputRaw, fn, extraArgs = []) => {
    const input = normalizeInput(inputRaw)
    const initialQueryResult = await page.$$(input.selector)
    if (initialQueryResult.length === 0) return null
    if (initialQueryResult.length - 1 < input.index) return null
    const foundElement = initialQueryResult[ input.index ]
    const result = await foundElement.evaluate(fn, ...extraArgs)
    await delay(STEP_DELAY)

    return result
  }

  const waitForSelector = async (selector, timeout = 10000) => {
    await page.waitForSelector(selector, {
      visible : true,
      timeout,
    })
    const found = await page.$$eval(selector, els => els.length > 0)

    return found
  }
  const waitForLocation = async (predicate, ms) => {
    if (!pass(predicate)(Function)) return 'Needs a predicate'

    const checker = async () => {
      const currentLocation = page.url()

      return predicate(currentLocation)
    }

    return waitForMethod(checker, ms)()
  }

  const waitFor = async (selectorInput, countInput = 1) => {
    const { selector, count } =
      typeof selectorInput === 'object' ?
        selectorInput :
        {
          selector : selectorInput,
          count    : countInput,
        }

    let counter = 40
    let found = await (async () => {
      const counted = await page.$$eval(selector, els => els.length)

      return counted >= count
    })()

    while (!found && counter > 0){
      counter -= 1
      await delay(DELAY)
      found = await (async () => {
        const counted = await page.$$eval(selector, els => els.length)

        return counted >= count
      })()
    }
    await delay(DELAY * 2)

    return found
  }

  const waitForSelectors = async (...selectors) => {
    const promised = selectors.map(singleSelector => waitFor(singleSelector))
    const result = await Promise.all(promised)

    return !result.includes(false)
  }

  const url = () => page.evaluate(() => window.location.href)

  const focus = async selector => {
    await $(selector, el => el.focus())

    return true
  }

  const count = selector => page.$$eval(selector, els => els.length)

  const exists = selector => page.$$eval(selector, els => els.length > 0)

  const click = async input => {
    const { index, selector } = normalizeInput(input)

    if (await exists(selector) === false){
      return false
    }

    if (index === 0){
      await $(selector, el => el.click())

      return true
    }

    await $$(
      selector, clickWhichSelector, index
    )

    return true
  }

  const clickAndWaitFor = async (
    firstSelectorRaw,
    predicateOrSelector,
    timeout = 5000
  ) => {
    const firstSelector = normalizeInput(firstSelectorRaw)
    const isSelector = type(predicateOrSelector) === 'Object'
    const secondSelector = isSelector ?
      normalizeInput(predicateOrSelector) :
      {}

    const okFirstSelector = await waitForMethod(async () => {
      const okExists = await exists(firstSelector.selector)

      return okExists
    }, 5000)()
    if (!okFirstSelector) return false

    await click(firstSelector)

    if (isSelector){
      const okSecondSelector = await waitForMethod(async () => {
        const okExists = await exists(secondSelector.selector)

        return okExists
      }, timeout)()

      return okSecondSelector
    }

    const okPredicate = await waitForMethod(predicateOrSelector, timeout)()

    return okPredicate
  }

  const clickWithText = async (selector, text) => {
    if (await exists(selector) === false){
      return false
    }
    await $$(
      selector, clickWithTextFn, text
    )

    return true
  }

  const clickWithPartialText = async (selector, text) => {
    if (await exists(selector) === false){
      return false
    }

    await $$(
      selector, clickWithPartialTextFn, text
    )

    return true
  }

  const waitAndClick = async inputRaw => {
    const input = normalizeInput(inputRaw)
    if (await waitFor(input.selector, input.index + 1) === false){
      return false
    }
    if (input.index === 0){
      await $(input.selector, el => el.click())

      return true
    }

    await $$(
      input.selector, clickWhichSelector, input.index
    )

    return true
  }

  const fill = async (selector, text) => {
    await focus(selector)
    await page.keyboard.type(text, { delay : 50 })
  }

  const setInput = async (selector, newValue) => {
    if (await exists(selector) === false){
      return false
    }

    await page.$eval(
      selector, setInputFn, newValue
    )

    return true
  }
  const pressTab = async timesToPress => {
    for (const i of range(0, timesToPress)){
      await page.keyboard.down('Tab')
      await delay(200)
    }
    await delay(300)
  }
  const typeText = async (input, step = 500) => {
    for (const char of input.split('')){
      await delay(step)
      await page.keyboard.down(char)
    }
  }
  const typeTextWithTab = async (
    input,
    tabs = {
      before : 0,
      after  : 0,
    },
    step = 500
  ) => {
    if (tabs.before !== 0){
      await pressTab(tabs.before)
    }
    for (const char of input.split('')){
      await delay(step)
      await page.keyboard.down(char)
    }
    if (tabs.after !== 0){
      await pressTab(tabs.after)
    }
  }

  const snap = async label => {
    if (!CAN_SNAP) return

    await page.screenshot({
      path     : `${ screenDir }/${ label }.png`,
      type     : 'png',
      fullPage : true,
    })
  }

  const ctrlA = async () => {
    await page.keyboard.down('ControlLeft')
    await page.keyboard.press('KeyA')
    await page.keyboard.up('ControlLeft')
    await delay(DELAY)
  }

  const its = (els, prop) => {
    if (els.length === 0) return null
    if (els[ prop ]) return els[ prop ]

    return Array.from(els).map(x => x[ prop ])
  }

  return {
    $$,
    $,
    click,
    clickWithPartialText,
    clickWithText,
    clickAndWaitFor,
    count,
    ctrlA,
    delay,
    exists,
    eval : evalFn,
    fill,
    focus,
    helpers,
    its,
    page,
    pressTab,
    setInput,
    snap,
    typeText,
    typeTextWithTab,
    url,
    waitForLocation,
    waitAndClick,
    waitFor,
    waitForSelector,
    waitForSelectors,
  }
}

function clickWhichSelector(els, i){
  const convertIndex = (x, length) =>
    typeof x === 'number' ? x : x === 'last' ? length - 1 : 0

  const index = convertIndex(i, els.length)

  if (index >= els.length){
    return false
  }

  els[ index ].click()

  return true
}

function clickWithTextFn(els, text){
  const filtered = els.filter(x => x.textContent === text)

  if (filtered.length === 0){
    return false
  }
  filtered[ 0 ].click()

  return true
}

function clickWithPartialTextFn(els, text){
  const filtered = els.filter(x => x.textContent.includes(text))

  if (filtered.length === 0){
    return false
  }
  filtered[ 0 ].click()

  return true
}

function setInputFn(el, newValue){
  el.value = newValue
}

exports.attach = attach
