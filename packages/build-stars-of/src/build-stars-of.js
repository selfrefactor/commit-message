import { existsSync } from 'fs'
import { outputFile, outputJson, readJson } from 'fs-extra'
import { getRepoData } from 'github-api-fn'
import { filter, map, ok, piped, prop, sort, take } from 'rambdax'
import { sortUsedBy } from 'sort-used-by'
import { kebabCase } from 'string-fn'

import { buildFinalOutput } from './build-final-output'

const STARS_LIMIT = 3
const DAYS_LIMIT = 200
const TOP_LIMIT = 400

async function getScrapedRepos(
  repo, fileName, shouldRefresh
){
  const filePath = `${ __dirname }/assets/${ fileName }-scraped.json`

  if (!shouldRefresh && !existsSync(filePath)){
    throw new Error('!exists')
  }

  if (!shouldRefresh && existsSync(filePath)){
    const { data } = await readJson(filePath)

    return data
  }

  const scrapedRepos = await sortUsedBy(repo)
  await outputJson(
    filePath, { data : scrapedRepos }, { spaces : 2 }
  )

  return scrapedRepos
}

async function getApiData({ repos, fileName, daysLimit, shouldRefresh }){
  const filePath = `${ __dirname }/assets/${ fileName }-api-data.json`

  if (!shouldRefresh && !existsSync(filePath)){
    throw new Error('!exists')
  }

  if (!shouldRefresh && existsSync(filePath)){
    const { data } = await readJson(filePath)

    return data
  }
  const apiData = await getRepoData({
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
  shouldRefreshScraped = true,
  shouldRefreshApi = true,
  starsLimit = STARS_LIMIT,
  daysLimit = DAYS_LIMIT,
  blacklist = [],
  outputLocation,
}){
  ok(
    outputLocation, repo, title
  )(
    String, String, String
  )
  const fileName = kebabCase(repo)
  const scrapedRepos = await getScrapedRepos(
    repo,
    fileName,
    shouldRefreshScraped
  )

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
}
