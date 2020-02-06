import {log} from 'helpers'
import {Response} from 'puppeteer'
import {click} from './modules/click'
import {waitForLoad, waitForNetwork} from './modules/constants'

import {initPuppeteer} from 'init-puppeteer'
import {getCredentials} from './modules/getCredentials'
import {getRepoName} from './modules/getRepoName'
import {getTagValue} from './modules/getTagValue'
import {typeModule } from './modules/type'

const selectors = {
  clickLoginSubmit: '.btn-primary',
  inputTag: 'input[placeholder="Tag version"]',
  password: '#password',
  submitTag: 'button.js-publish-release',
  username: '#login_field',
}

export async function setGithubTag(tag): Promise<void | string> {
  try {
    const repoName = getRepoName()
    const {user, password} = getCredentials()
    var {browser, page} = await initPuppeteer({
      headless: process.env.RAMBDAX_LOG !== 'OFF',
    })

    const urlGithub = 'https://github.com/'
    const urlInit = `${urlGithub}login`
    await page.goto(urlInit, waitForNetwork)

    await typeModule({
      selector: selectors.username,
      text: user,
      page,
    })

    await typeModule({
      selector: selectors.password,
      text: password,
      page,
    })

    await page.evaluate(click, selectors.clickLoginSubmit)

    const responseURLInit: any = await page.waitForNavigation(waitForLoad)
    const responseOK = (responseURLInit._url as any).includes('github.com')

    if (!responseOK) {
      throw `Not valid credentials('${user}' '${password}')`
    }

    const urlRepo = `https://github.com/${user}/${repoName}`
    const responseURLRepo: Response = await page.goto(
      urlRepo,
      waitForNetwork,
    )

    if (!responseURLRepo.ok) {
      log(`Github user '${user}' doesn't have repo '${repoName}'`, 'error')

      return
    }

    const urlRelease = `${urlRepo}/releases`
    await page.goto(urlRelease, waitForNetwork)

    const tagValue: string = await getTagValue({page, tag})

    const urlNewRelease = `${urlRelease}/new`
    await page.goto(urlNewRelease, waitForNetwork)

    await typeModule({
      selector: selectors.inputTag,
      text: tagValue,
      page,
    })

    await page.evaluate(click, selectors.submitTag)
    const responseURLNewTag: any = await page.waitForNavigation(
      waitForLoad,
    )

    const expectedURL = `${urlRepo}/releases/tag/${tagValue}`
    const ok =
      responseURLNewTag.ok && responseURLNewTag._url === expectedURL

    if (ok) {
      log(
        `Published new tag '${tagValue}' on repo '${repoName}'`,
        'success',
      )
      const command = `yarn add https://github.com/${user}/${repoName}#${tagValue}`

      return log(`Install as dependency with '${command}'`, 'info')
    }

    log(
      `Something went wrong when publishing new tag '${tagValue}'`,
      'error',
    )
  } catch (err) {
    console.log(err)
  } finally {
    if (browser && browser.close) {
      await browser.close()
    }
  }
}
