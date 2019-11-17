import { initPuppeteer } from 'init-puppeteer'
import { delay } from 'rambdax'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000

test('', async () => {
  const { browser, page } = await initPuppeteer({
    headless: false,
    url: 'https://ilearnsmarter.com/',
    waitCondition: 'DOM'
  })

  await delay(3000)
  await browser.close()
  expect(
    true,
  ).toBeTruthy()
})