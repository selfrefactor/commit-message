import { initPuppeteer, attach } from 'init-puppeteer'
import { delay, random } from 'rambdax'
import { normalize } from './normalize'
import { debug } from '../_modules/debug';

export async function bulgarian(word: string): Promise<string[]>{
  try{
    const settings = {
      headless: true,
      url: `https://translate.google.com/?hl=en&tab=TT#bg/en/`,
    }
    
    var { browser, page } = await initPuppeteer(settings)
    const _ = attach(page)
    
    await page.focus('#source')
    await delay(1000)

    let holder = []
    let counter = -1

    for (const char of word.split('')) {
      counter++
      await page.keyboard.sendCharacter(char)
      if(counter < 3){
        await delay(random(150, 200))
        continue
      }
      await delay(random(750, 1000))
      
      const textContent = await _.$$(
        '.gt-baf-translations', 
        els => els.map(x => x.textContent)
      )

      const ok = textContent !== null && textContent.length > holder.length
      holder = ok ? textContent : holder
    }

    await browser.close()

    if(holder === null) return []
    const final = normalize(word,holder)

    return final
  }catch(e){
    console.log(e)
    if (browser !== undefined && browser.close !== undefined) {
      await browser.close()
    }
    return []
  }
}

if(debug()){
  bulgarian("решението").then(result => {
    console.log(result)
  })
}