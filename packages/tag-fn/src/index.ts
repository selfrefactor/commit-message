import * as log from 'log-fn'
import { Response } from 'puppeteer'
import { click } from './modules/click'
import { waitForLoad, waitForNetwork} from './modules/constants'

import { getCredentials } from './modules/getCredentials'
import { getRepoName } from './modules/getRepoName'
import { getTagValue } from './modules/getTagValue'
import { initPuppeteer } from 'init-puppeteer'
import { typeModule } from './modules/type'

const selectors = {
  clickLoginSubmit: '.btn-primary',
  inputTag: 'input[placeholder="Tag version"]',
  password: '#password',
  submitTag: 'button.js-publish-release',
  username: '#login_field',
}
const DEBUG_FLAG = false

if(DEBUG_FLAG){
  tagFn({tag: undefined}).then(console.log).catch(console.log)
}

export async function tagFn(input: IInput): Promise<void|string>{
  try{
    const repoName = getRepoName()
    const {user, password} = getCredentials()
    var { browser, page } = await initPuppeteer({headless: !DEBUG_FLAG})

    const urlGithub = 'https://github.com/'
    const urlInit = `${urlGithub}login`
    await page.goto(urlInit, waitForNetwork)

    await typeModule({
      selector: selectors.username,
      text: user,
      page
    })

    await typeModule({
      selector: selectors.password,
      text: password,
      page
    })

    await page.evaluate(click, selectors.clickLoginSubmit)

    /**
     * Typescript doesn't like when `responseURLInit: Response`
     */
    const responseURLInit: any = await page.waitForNavigation(waitForLoad)
    const responseOK = (responseURLInit._url as any).includes('github.com')

    if (!responseOK){
      throw `Not valid credentials('${user}' '${password}')`
    }

    const urlRepo = `https://github.com/${user}/${repoName}`
    const responseURLRepo: Response = await page.goto(urlRepo, waitForNetwork)

    if (!responseURLRepo.ok){
      log(`Github user '${user}' doesn't have repo '${repoName}'`, 'error')

      return
    }

    const urlRelease = `${urlRepo}/releases`
    await page.goto(urlRelease, waitForNetwork)

    const tagValue: string = await getTagValue({page, input})

    const urlNewRelease = `${urlRelease}/new`
    await page.goto(urlNewRelease, waitForNetwork)

    await typeModule({ 
      selector: selectors.inputTag, 
      text: tagValue, 
      page 
    })

    await page.evaluate(click, selectors.submitTag)
    const responseURLNewTag: any = await page.waitForNavigation(waitForLoad)

    const expectedURL = `${urlRepo}/releases/tag/${tagValue}`
    const ok = responseURLNewTag.ok && responseURLNewTag._url === expectedURL

    if (ok) {
      log(`Published new tag '${tagValue}' on repo '${repoName}'`, 'success')
      const command = `yarn add https://github.com/${user}/${repoName}#${tagValue}`

      return log(`Install as dependency with '${command}'`, 'info')
    }

    log(`Something went wrong when publishing new tag '${tagValue}'`, 'error')
  }catch (err){
    console.log(err)
  }finally{
    if (browser !== undefined){
      await browser.close()
    }
  }
}
