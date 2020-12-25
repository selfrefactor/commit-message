import { outputJson } from 'fs-extra'
import { playwrightInit } from 'playwright-init'
import { wrap } from 'playwright-wrap'
import { delay, mapAsync } from 'rambdax'

import { getRepoData } from './get-repo-data'
import { sortResult } from './sort-result'

export const RESULT = `${ __dirname }/result.json`
const COOL_OFF = 2000
const LINKS = '[class="Box-row d-flex flex-items-center"]'

async function hasNext(_){
  const el = await _.page.$('.paginate-container button')
  if (!el) return true
  const buttonText = await el.textContent()

  return buttonText !== 'Next'
}

async function getLinks(_){
  await _.waitFor(LINKS)
  const els = await _.queryAll(LINKS)

  const links = await mapAsync(async el => {
    const repoUrlRawData = await el.text()
    const { repoUrl, stars } = getRepoData(repoUrlRawData)

    return {
      repo : repoUrl,
      stars,
    }
  }, els)

  const firstLink = await els[ 0 ].text()

  return {
    links,
    firstLink,
  }
}

function waitForNext(_, compareTo){
  return async () => {
    const el = await _.page.$(LINKS)
    if(!el) return true
    const text = await el.textContent()

    return text !== compareTo
  }
}

export async function sortUsedBy(repo){
  if (!repo.includes('/')) throw new Error('!repo')
  const url = `https://github.com/${ repo }/network/dependents`
  let data = []

  const { browser, page } = await playwrightInit({
    headless : true,
    logFlag  : false,
    browser  : 'chromium',
    url,
  })
  const _ = wrap(page)
  
  try {
    let canProceed = await hasNext(_)

    while (canProceed){
      const { links, firstLink } = await getLinks(_)
      data = [ ...data, ...links ]
      canProceed = await hasNext(_)
      await delay(COOL_OFF)
      await outputJson(RESULT, data)

      if (canProceed){
        await _.clickWithText('Next')
        await _.waitForPredicate(waitForNext(_, firstLink))
      }
    }
  } catch (e){
    console.log({ e }, 'sortUsedBy')
    await _.snap('error.sort.used.by')
  } finally {
    await browser.close()
    return sortResult(data)
  }
}
