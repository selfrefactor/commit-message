const { delay } = require('rambdax')
const { initPuppeteer, attach } = require('init-puppeteer')

const URL = 'http://localhost:8080/write-sentence?id=you-ready-new-something'
jest.setTimeout(30000)

test('write sentence basic', async () => {
  const { browser, page } = await initPuppeteer({
    // Headless : false,
    url : URL,
  })
  const _ = attach(page)
  await _.keypressText('Wenn.du.bist.f o o')
  const points = await _.$('div#points', el => el.textContent)

  await _.snap('points')
  expect(points).toBe('2')

  await browser.close()
})
