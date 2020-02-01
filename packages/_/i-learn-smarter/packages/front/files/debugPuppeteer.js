const { initPuppeteer, attach } = require('init-puppeteer')
const { delay } = require('rambdax')

const URL = 'http://localhost:8080'

void async function debug(){
  const { browser, page } = await initPuppeteer({
    headless: false,
    url: URL,
  })
  const _ = attach(page)
  const getFirstChoice = () => _.$('.chooseword--question div', 'result = el.textContent')

  // Go to app's address
  // await dom.click('#toggle-navigation')
  // await dom.click('.navigation__item--third')
  // const currentURL = await page.evaluate(() => window.location.href)

  // Expect to see three choices
  // const numberChoices = await $$('.chooseword--question div', 'result = els.length')
  // Expect first choice to be a valid string
  // await page.keyboard.press("ArrowRight", {delay: 50})
  // await page.keyboard.press("ArrowRight", {delay: 50})
  // await delay(500)

  // Expect first choice to be different after keypress

  // const firstChoiceAfter = await getFirstChoice()
  // console.warn(firstChoice, firstChoiceAfter)
  // expect(firstChoiceAfter).not.toEqual(firstChoice)

  await browser.close()
  await delay(2000)
}()
