const { delay, range, waitFor: waitForMethod, ok, mapAsync, uuid } = require('rambdax')
const { dotCase } = require('string-fn');
const process = require('process');

async function filterAsync(predicate, list){
  const toReturn = []

  await mapAsync(async x => {
    const shouldPush = await predicate(x)
    if(shouldPush) toReturn.push(x)
  }, list)

  return toReturn
}

const DELAY = 7000

function attach(page, browserMode = 'chromium', snapDir = `${process.cwd()}/screenshots`){
  const getWaitCondition = () => {
    if (browserMode === 'chromium') {
      return {
        waitUntil: 'networkidle'
      };
    }
    return {
      waitUntil: 'load'
    };
  }
  
  const waitForLocation = async (predicate, ms = DELAY) => {
    ok(predicate)(Function)

    const checker = async () => {
      const currentLocation = page.url()

      return predicate(currentLocation)
    }

    const waitResult = await waitForMethod(checker, ms, 7)()

    if(!waitResult){
      throw new Error(`Fail to wait to location to change! Current location - ${page.url()}`)
    }
  }

  const count = selector => page.$$eval(selector, els => els.length)

  const exists = selector => page.$$eval(selector, els => els.length > 0)

  const pressTab = async timesToPress => {
    for (const i of range(0, timesToPress)){
      await page.keyboard.down('Tab')
      await delay(200)
    }
    await delay(300)
  }

  const applyMocks = async (serverMocks) => {
    ok(serverMocks)([{route: String, path: String}])
    const applySingleMock = async (serverMock) => {
      await page.route(serverMock.route, route =>
        route.fulfill({
          path: serverMock.path
        })
      );
    }

    await  mapAsync(applySingleMock, serverMocks)
  };

  const getAllClassNames = async typeElement => {
    const classNamesList = await page.evaluate(selector => {
      const allSelectors = Array.from(document.querySelectorAll(selector));
      return allSelectors.map(({ className }) => className);
    }, typeElement);
    return classNamesList;
  };

  const getClassName = async ({ typeElement, predicate, nth = 0 }) => {
    const allClassNames = await getAllClassNames(typeElement);

    if (allClassNames.length === 0) {
      throw new Error('No elements found');
    }

    const filtered = allClassNames.filter(predicate);

    if (filtered.length < nth) {
      throw new Error(
        `Cannot find enough elements in list with length ${filtered.length}`
      );
    }

    return filtered[nth].split(' ').filter(predicate)[0];
  };

  const goto = async url => {
    return page.goto(url, getWaitCondition());
  };

  const clickAndWait = async (el, navigateEndsWith) => {
    await Promise.all([
      page.waitForNavigation({ url: `**/${navigateEndsWith}` }),
      page.click(el)
    ]);
  };

  const click = async (selector, nth) => {
    const els = await page.$$(selector);
    if (els.length <= nth) {
      throw new Error(`Found only ${els.length} but requested ${nth} index | ${selector}`);
    }
    els[nth].click();
  };

  const waitFor = async (playwrightInput, count = 1, ms = DELAY) => {
    const condition = async () => {
      const foundElements = await page.$$(playwrightInput);
      return foundElements.length >= count;
    };
    const waitResult = await waitForMethod(condition, ms)();
    if (!waitResult) {
      throw new Error(`Failed wait condition | '${playwrightInput}'`);
    }
  };

  const waitAgainst = async (playwrightInput, count = 1, ms = DELAY) => {
    const condition = async () => {
      const foundElements = await page.$$(playwrightInput);
      return foundElements.length < count;
    };
    const waitResult = await waitForMethod(condition, ms)();
    if (!waitResult) {
      throw new Error(`Failed wait condition | '${playwrightInput}'`);
    }
  };

  const waitForAndClick = async (playwrightInput, nth = 0, ms = DELAY) => {
    await waitFor(playwrightInput, nth + 1, ms);
    const foundElements = await page.$$(playwrightInput);
    if (foundElements.length <= nth) {
      throw new Error(
        `Found only ${foundElements.length} but requested ${nth} index | ${playwrightInput}`
      );
    }
    await foundElements[nth].click();
  };

  const waitForClassName = async ({ typeElement, predicate, ms = DELAY, count = 1 }) => {
    ok(predicate)(Function);

    const checker = async () => {
      const allClassNames = await getAllClassNames(typeElement)
      const filtered = allClassNames.filter(predicate);

      return filtered.length >= count
    };

    const waitResult = await waitForMethod(checker, ms, 7)();
    if (!waitResult) {
      throw new Error(`Failed wait condition for class name'`);
    }
  }

  const snap = async (label) => {
    const fileName = label ? dotCase(label) : uuid(5, true);
    const screenPath = `${snapDir}/${fileName}.png`;
    console.log(`Saved screenshot to '${fileName}.png'`);
  
    await page.screenshot({ path: screenPath, fullPage: true });
  }

  const findWithText = async ({typeElement, nth, text}) => {
    const allElements = await page.$$(typeElement);
    if(allElements.length === 0) throw new Error('!allElements | findWithText')
    
    const foundElements = await filterAsync(async el => {
      const textContent = await el.textContent()
      return textContent === text
    }, allElements)
    
    if(foundElements.length === 0) throw new Error('!foundElements | findWithText')
    if(foundElements.length <= nth){
      throw new Error(`Not enough elements found for text - '${text}'. Found only ${foundElements.length}`)
    } 

    return foundElements[nth]
  }

  const clickWithText = async ({typeElement, text, nth}) => {
    const found = await findWithText({typeElement, nth, text})
    found.click();
  }

  return {
    applyMocks,
    click,
    clickAndWait,
    findWithText,
    clickWithText,
    count,
    exists,
    getAllClassNames,
    getClassName,
    goto,
    page,
    pressTab,
    snap,
    waitAgainst,
    waitFor,
    waitForAndClick,
    waitForClassName,
    waitForLocation,
  }
}

exports.attach = attach
