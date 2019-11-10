const puppeteer = require('puppeteer-core')
const {delay} = require('rambdax')

async function init(input){
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: '/usr/bin/google-chrome-unstable'
  })
  const page = await browser.newPage()
  // await page.setViewport({
  //   height : input.resolution.y,
  //   width  : input.resolution.x,
  // })

  await page.goto('https://github.com');
  await delay(5000)
  await page.screenshot({path: 'example.png'});
  await browser.close();
}

void async function fn(){
  await init()
}()
