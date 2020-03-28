const puppeteer = require('puppeteer')
const { getSettings } = require('./getSettings')

const iPhone = puppeteer.devices[ 'iPhone 6' ]

async function init(input, extraProps = {}){
  const settings = getSettings(input, extraProps)
  const browser = await puppeteer.launch(settings)
  const page = await browser.newPage()
  await page.setViewport({
    height : input.resolution.y,
    width  : input.resolution.x,
  })

  if (input.mobile) await page.emulate(iPhone)

  return {
    browser,
    page,
  }
}

exports.init = init
