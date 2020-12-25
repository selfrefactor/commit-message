import {wrap} from 'playwright-wrap'
import {playwrightInit} from 'playwright-init'


export async function sortUsedBy(user, repo){
  const url = `https://github.com/${user}/${repo}`

  const {browser, page} = await playwrightInit({
    resolution: screen,
    headless: false,
    logFlag: false,
    browser: 'chromium',
    url,
  })
  const _ = wrap(page)
  await _.clickWi
  Used by

}  
 