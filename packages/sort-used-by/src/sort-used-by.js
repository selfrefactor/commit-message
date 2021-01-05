const { delay, mapAsync, wait } = require('rambdax')
const { outputJson } = require('fs-extra')
const { playwrightInit } = require('playwright-init')
const { wrap } = require('playwright-wrap')

const { getRepoData } = require('./get-repo-data')
const { sortResult } = require('./sort-result')

const RESULT = `${ __dirname }/result.json`
const COOL_OFF = 1000
const LINKS = '[class="Box-row d-flex flex-items-center"]'

async function hasNext(_){
  const el = await _.page.$('.paginate-container button')
  if (!el) return true
  const buttonText = await el.textContent()

  return buttonText !== 'Next'
}

async function getLinks(_){
  const [ , err ] = await wait(_.waitFor(LINKS))
  if (err) return { canContinue : false }
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
    canContinue : true,
    links,
    firstLink,
  }
}

function waitForNext(_, compareTo){
  return async () => {
    const el = await _.page.$(LINKS)
    if (!el) return true
    const text = await el.textContent()

    return text !== compareTo
  }
}

async function sortUsedBy(repo){
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
    let counter = 60
    while (canProceed&&counter>=0){
      const { links, firstLink, canContinue } = await getLinks(_)
      if (!canContinue){
        canProceed = false

        return
      }
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

exports.RESULT = RESULT
exports.sortUsedBy = sortUsedBy
