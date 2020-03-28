const { initPuppeteer, attach } = require('./')
process.env.PUPPETEER_DEBUG = 'true'

const GITHUB = 'https://github.com'

void (async function debug(){
  try {
    console.log('start')
    const { browser, page } = await initPuppeteer({
      headless      : true,
      logFlag       : false,
      url           : GITHUB,
      waitCondition : {
        timeout   : 5800,
        waitUntil : 'networkidle2',
      },
    })

    const _ = attach(page)
    const text = await _.$$(
      'div', _.its, 'innerHTML'
    )
    console.log(text.length)
    _.expect(
      1, 1, 'foo'
    )
    await browser.close()
  } catch (e){
    console.log(e)
  }
})()
