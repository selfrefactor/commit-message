const { delay, mapAsync, wait } = require('rambdax')
const { outputJson } = require('fs-extra')
const { playwrightInit } = require('playwright-init')
const { wrap } = require('playwright-wrap')

const { getRepoData } = require('./get-repo-data')
const { parseResult } = require('./parse-result')

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
      isValid : !Number.isNaN(stars) && Boolean(repoUrl),
      repo    : repoUrl,
      stars,
    }
  }, els)

  const firstLink = await els[ 0 ].text()

  return {
    canContinue : true,
    links       : links.filter(({ isValid }) => isValid),
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

async function sortUsedBy({
  repo,
  isDev = false,
  showProgress = false,
  isHuge = false,
  pageLimit = 200,
}){
  if (!repo.includes('/')) throw new Error('!repo')
  const urlRepos = `https://github.com/${ repo }/network/dependents`
  const urlPackages = `https://github.com/${ repo }/network/dependents?dependent_type=PACKAGE`

  let data = []

  const { browser, page } = await playwrightInit({
    headless : !isDev,
    logFlag  : false,
    browser  : 'chromium',
    url      : isHuge ? urlPackages : urlRepos,
  })
  const _ = wrap(page)

  try {
    let canProceed = await hasNext(_)
    let counter = pageLimit
    while (canProceed && counter-- >= 0){
      if (showProgress) console.log(counter)
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
  } catch (err){
    console.log(err, 'sortUsedBy')
    await _.snap('error.sort.used.by')
  } finally {
    await browser.close()

    return parseResult(data)
  }
}

exports.RESULT = RESULT
exports.sortUsedBy = sortUsedBy
