import { existsSync } from 'fs'
import { outputFile, outputJson, readJson } from 'fs-extra'
import { getRepoData } from 'github-api-fn'
import { filter, map, ok, piped, prop, sort, take, uniq } from 'rambdax'
import { sortUsedBy } from 'sort-used-by'
import { kebabCase } from 'string-fn'

import { buildFinalOutput } from './build-final-output'

const STARS_LIMIT = 3
const DAYS_LIMIT = 200
const TOP_LIMIT = 400

async function getScrapedRepos({
  repo,
  maxScrapeDepth,
  fileName,
  showProgress,
  scrapeDeep,
  shouldRefresh,
  isDev,
  isHuge,
}){
  const filePath = `${ __dirname }/assets/${ fileName }-scraped.json`

  if (!shouldRefresh && !existsSync(filePath)){
    throw new Error('!exists')
  }

  if (!shouldRefresh && existsSync(filePath)){
    const { data } = await readJson(filePath)

    return data
  }

  const scrapedRepos = await sortUsedBy({
    repo,
    isDev,
    isHuge,
    showProgress,
    pageLimit : maxScrapeDepth,
  })
  if (scrapeDeep){
    const additionalScrapedRepos = await sortUsedBy({
      repo,
      showProgress,
      isDev,
      isHuge    : !isHuge,
      pageLimit : maxScrapeDepth,
    })
    const allScrapedRepos = uniq([
      ...scrapedRepos,
      ...additionalScrapedRepos,
    ])
    await outputJson(
      filePath, { data : allScrapedRepos }, { spaces : 2 }
    )

    return allScrapedRepos
  }

  await outputJson(
    filePath, { data : scrapedRepos }, { spaces : 2 }
  )

  return scrapedRepos
}

async function getApiData({ repos, fileName, daysLimit, shouldRefresh, showProgress }){
  const filePath = `${ __dirname }/assets/${ fileName }-api-data.json`

  if (!shouldRefresh && !existsSync(filePath)){
    throw new Error('!exists')
  }

  if (!shouldRefresh && existsSync(filePath)){
    const { data } = await readJson(filePath)

    return data
  }
  const apiData = await getRepoData({
    showProgress,
    repos,
    daysLimit,
  })
  await outputJson(
    filePath, { data : apiData }, { spaces : 2 }
  )

  return apiData
}

export async function buildStarsOf({
  repo,
  title,
  isDev = false,
  isHuge = false,
  scrapeDeep = false,
  shouldRefreshScraped = true,
  showProgress = false,
  shouldRefreshApi = true,
  starsLimit = STARS_LIMIT,
  daysLimit = DAYS_LIMIT,
  maxScrapeDepth = 200,
  blacklist = [],
  outputLocation,
}){
  ok(
    outputLocation, repo, title
  )(
    String, String, String
  )
  const fileName = kebabCase(repo)
  const scrapedRepos = await getScrapedRepos({
    showProgress,
    maxScrapeDepth,
    isHuge,
    isDev,
    repo,
    fileName,
    scrapeDeep,
    shouldRefresh : shouldRefreshScraped,
  })
  console.log('sort.used.by done')

  const repos = piped(
    scrapedRepos,
    filter(({ stars }) => stars >= starsLimit),
    filter(x => !blacklist.includes(x.repo)),
    sort((a, b) => a.stars > b.stars ? -1 : 1),
    take(TOP_LIMIT),
    map(prop('repo'))
  )
  console.log({ len : repos.length })
  const apiData = await getApiData({
    repos,
    fileName,
    showProgress,
    shouldRefresh : shouldRefreshApi,
    daysLimit,
  })
  const filteredApiData = apiData.filter(({ filterData }) => filterData.pass !== false)

  const finalOutput = buildFinalOutput({
    data : filteredApiData,
    title,
    repo,
  })
  await outputFile(outputLocation, finalOutput)

  return filteredApiData
}
