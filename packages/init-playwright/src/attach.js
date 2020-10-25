const process = require('process')
const {
  delay,
  range,
  waitFor: waitForMethod,
  ok,
  mapAsync,
} = require('rambdax')
const { dotCase, randomString } = require('string-fn')

async function filterAsync(predicate, list){
  const toReturn = []

  await mapAsync(async x => {
    const shouldPush = await predicate(x)
    if (shouldPush) toReturn.push(x)
  }, list)

  return toReturn
}

const DELAY = 7000
const TICK = 150

function attach(
  page,
  browserMode = 'chromium',
  snapDir = `${ process.cwd() }/screenshots`
){
  const getWaitCondition = () => {
    if (browserMode === 'chromium'){
      return { waitUntil : 'networkidle' }
    }

    return { waitUntil : 'load' }
  }

  const waitForLocation = async (predicate, ms = DELAY) => {
    ok(predicate)(Function)

    const checker = async () => {
      const currentLocation = page.url()

      return predicate(currentLocation)
    }

    const waitResult = await waitForMethod(
      checker, ms, 7
    )()

    if (!waitResult){
      throw new Error(`Fail to wait to location to change! Current location - ${ page.url() }`)
    }
    await delay(TICK)
  }

  const countFn = selector => page.$$eval(selector, els => els.length)

  const exists = selector => page.$$eval(selector, els => els.length > 0)

  const applyMocks = async serverMocks => {
    ok(serverMocks)([
      {
        route : String,
        path  : String,
      },
    ])
    const applySingleMock = async serverMock => {
      await page.route(serverMock.route, route =>
        route.fulfill({ path : serverMock.path }))
    }

    await mapAsync(applySingleMock, serverMocks)
  }

  const getAllClassNames = async typeElement => {
    const classNamesList = await page.evaluate(selector => {
      const allSelectors = Array.from(document.querySelectorAll(selector))

      return allSelectors.map(({ className }) => className)
    }, typeElement)

    return classNamesList
  }

  const getClassName = async ({ typeElement, predicate, nth = 0 }) => {
    const allClassNames = await getAllClassNames(typeElement)

    if (allClassNames.length === 0){
      throw new Error('No elements found')
    }

    const filtered = allClassNames.filter(predicate)

    if (filtered.length < nth){
      throw new Error(`Cannot find enough elements in list with length ${ filtered.length }`)
    }

    return filtered[ nth ].split(' ').filter(predicate)[ 0 ]
  }

  const goto = async url => {
    await page.goto(url, getWaitCondition())
    await delay(TICK)
  }

  const clickAndWaitForNavigation = async (
    playwrightInput,
    navigateEndsWith
  ) => {
    await Promise.all([
      page.waitForNavigation({ url : `**/${ navigateEndsWith }` }),
      page.click(playwrightInput, { force : true }),
    ])
    await delay(TICK)
  }

  const click = async (selector, nth) => {
    const els = await page.$$(selector)
    if (els.length <= nth){
      throw new Error(`Found only ${ els.length } but requested ${ nth } index | ${ selector }`)
    }

    await els[nth].scrollIntoViewIfNeeded();
    await els[ nth ].click({ force : true })
    await delay(TICK)
  }

  const forceClick = async (playwrightInput) => {
    await page.$eval(playwrightInput, el => el.scrollIntoView());
    await delay(TICK);
    await click(playwrightInput, 0)
  };

  const waitFor = async (playwrightInput, count = 1, ms = DELAY) => {
    const condition = async () => {
      const foundElements = await page.$$(playwrightInput)

      return foundElements.length >= count
    }
    const waitResult = await waitForMethod(condition, ms)()
    if (!waitResult){
      throw new Error(`Failed wait condition | '${ playwrightInput }'`)
    }
    await delay(TICK)
  }

  const waitAgainst = async (playwrightInput, count = 1, ms = DELAY) => {
    const condition = async () => {
      const foundElements = await page.$$(playwrightInput)

      return foundElements.length < count
    }
    const waitResult = await waitForMethod(condition, ms)()
    if (!waitResult){
      throw new Error(`Failed wait against condition | '${ playwrightInput }'`)
    }
    await delay(TICK)
  }

  const waitForAndClick = async (playwrightInput, nth = 0, ms = DELAY) => {
    await waitFor(
      playwrightInput, nth + 1, ms
    )
    const foundElements = await page.$$(playwrightInput)
    if (foundElements.length <= nth){
      throw new Error(`Found only ${ foundElements.length } but requested ${ nth } index | ${ playwrightInput }`)
    }
    await foundElements[ nth ].click({ force : true })
    await delay(TICK)
  }

  const waitForClassName = async ({
    typeElement,
    predicate,
    ms = DELAY,
    count = 1,
  }) => {
    ok(predicate)(Function)

    const checker = async () => {
      const allClassNames = await getAllClassNames(typeElement)
      const filtered = allClassNames.filter(predicate)

      return filtered.length >= count
    }

    const waitResult = await waitForMethod(
      checker, ms, 7
    )()
    if (!waitResult){
      throw new Error('Failed wait condition for class name\'')
    }
    await delay(TICK)
  }

  const waitForText = async (text, ms = DELAY) => {
    const checker = async () => {
      const el = await page.$(`text="${ text }"`)

      return el !== null
    }
    const waitResult = await waitForMethod(checker, ms)()
    if (!waitResult){
      throw new Error(`Fail to wait for text "${ text }" to appear on page`)
    }
    await delay(TICK)
  }

  const waitAgainstText = async (text, ms = DELAY) => {
    const checker = async () => {
      const el = await page.$(`text="${ text }"`)

      return el === null
    }
    const waitResult = await waitForMethod(checker, ms)()
    if (!waitResult){
      throw new Error(`Fail to wait for text "${ text }" to disappear on page`)
    }
    await delay(TICK)
  }

  const snap = async label => {
    const fileName = label ? dotCase(label) : randomString(5, true)
    const screenPath = `${ snapDir }/${ fileName }.png`
    console.log(`Saved screenshot to '${ fileName }.png'`)

    await page.screenshot({
      path     : screenPath,
      fullPage : true,
    })
  }

  const findWithTextNth = async ({ typeElement, nth, text }) => {
    const allElements = await page.$$(typeElement)
    if (allElements.length === 0)
      throw new Error('!allElements | findWithText')

    const foundElements = await filterAsync(async el => {
      const textContent = await el.textContent()

      return textContent === text
    }, allElements)

    if (foundElements.length === 0)
      throw new Error('!foundElements | findWithText')
    if (foundElements.length <= nth){
      throw new Error(`Not enough elements found for text - '${ text }'. Found only ${ foundElements.length }`)
    }

    return foundElements[ nth ]
  }
  const queryProp = async (typeElement, predicate, prop) => {
    const foundList = await page.evaluate(input => {
      const allSelectors = Array.from(document.querySelectorAll(input.typeElement));
      return allSelectors.map(el => el[input.prop]);
    }, {typeElement, prop});

    if (!predicate) return foundList;

    return foundList.filter(predicate);
  };

  const clickWith = async ({ typeElement, nth = 0, predicate, prop = 'className' }) => {
    const props = await queryProp(typeElement, predicate, prop)
    if (props.length <= nth) {
      throw new Error(
        `Found only ${props.length} but requested ${nth} index | ${typeElement}`
      );
    }

    const playwrightInput = prop === 'className' ?
    `.${props[nth]}` :
    `#${props[nth]}`

    await click(playwrightInput)
  }

  const clickWithText = async (text, ms = DELAY) => {
    await waitForText(text, ms)
    await page.click(`text="${ text }"`)
    await delay(TICK)
  }

  const clickWithTextNth = async ({ typeElement, text, nth }) => {
    const found = await findWithTextNth({
      typeElement,
      nth,
      text,
    })

    await found.click({ force : true })
    await delay(TICK)
  }

  const findWithPredicate = async ({ typeElement, nth = 0, predicate }) => {
    const allElements = await page.$$(typeElement)
    if (allElements.length === 0)
      throw new Error('!allElements | findWithText')

    const foundElements = await filterAsync(predicate, allElements)

    if (foundElements.length === 0)
      throw new Error('!foundElements | findWithText')
    if (foundElements.length <= nth){
      throw new Error(`Not enough elements found for predicate - '${ predicate.toString() }'. Found only ${
        foundElements.length
      }`)
    }

    return foundElements[ nth ]
  }

  const pressTab = async timesToPress => {
    await page.focus('body')
    await mapAsync(async () => {
      await page.press('body', 'Tab')
      await delay(TICK)
    })(range(0, timesToPress + 1))
  }

  const waitForPredicate = async (predicate, ms = DELAY) => {
    const condition = async () => {
      const predicateResult = await predicate()

      return predicateResult
    }
    const waitResult = await waitForMethod(condition, ms)()
    if (!waitResult){
      throw new Error(`Failed wait for predicate | ${ predicate.toString() }'`)
    }
    await delay(TICK)
  }

  async function executeInsideNamedIframe({
    frameName,
    selector,
    predicate,
    executeFn,
    ms = DELAY,
  }){
    await waitForPredicate(async () => {
      const mainFrame = await page.frame(frameName)

      return mainFrame !== null
    }, ms)
    let success = false

    const iframe = await page.frame(frameName)
    const foundElements = await iframe.$$(selector)
    if (foundElements.length === 0) return null

    await mapAsync(async el => {
      if (success) return

      const predicateResult = await predicate(el)
      if (!predicateResult) return

      success = true
      await executeFn(el)
    })(foundElements)

    if (!success){
      throw new Error(`Cannot execute script over selector "${ selector }" inside iframe with name "${ frameName }"`)
    }
  }

  async function executeInsideIframeFn({ selector, executeFn, predicate }){
    const mainFrame = await page.mainFrame()
    const childFrames = await mainFrame.childFrames()
    let success = false

    await mapAsync(async childFrame => {
      if (success) return
      const foundElements = await childFrame.$$(selector)
      if (foundElements.length === 0) return null

      await mapAsync(async singleElement => {
        if (success) return
        const predicateResult = await predicate(singleElement)
        if (!predicateResult) return
        success = true
        await executeFn(singleElement)
      })(foundElements)
    })(childFrames)

    return success
  }

  async function executeInsideIframe({
    selector,
    executeFn,
    predicate,
    ms = DELAY,
  }){
    await waitForPredicate(async () => {
      const success = await executeInsideIframeFn({
        selector,
        executeFn,
        predicate,
      })

      return success
    }, ms)
  }

  async function fillInsideIframe({
    text,
    predicate,
    ms = DELAY,
    selector = 'input',
  }){
    const executeFn = async singleElement => {
      await singleElement.fill(text)
    }
    const condition = async () => {
      const success = await executeInsideIframeFn({
        selector,
        predicate,
        executeFn,
      })

      return success
    }
    const waitResult = await waitForMethod(condition, ms)()
    if (!waitResult){
      throw new Error(`Cannot fill text "${ text }" inside iframe`)
    }
    await delay(TICK)
  }


  return {
    applyMocks,
    click,
    forceClick,
    clickAndWaitForNavigation,
    clickWith,
    clickWithText,
    clickWithTextNth,
    count : countFn,
    delay,
    exists,
    findWithPredicate,
    findWithTextNth,
    fillInsideIframe,
    executeInsideNamedIframe,
    executeInsideIframe,
    getAllClassNames,
    getClassName,
    goto,
    page,
    pressTab,
    snap,
    sleep: async () => delay(1000),
    waitAgainst,
    waitAgainstText,
    waitFor,
    waitForAndClick,
    waitForClassName,
    waitForLocation,
    waitForPredicate,
    waitForText,
  }
}

exports.attach = attach
