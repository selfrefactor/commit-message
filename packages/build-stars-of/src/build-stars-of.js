import {sortUsedBy} from 'sort-used-by'
import {getRepoData} from 'github-api-fn'
import {outputJson, readJson} from 'fs-extra'
import { kebabCase } from 'string-fn'
import { existsSync } from 'fs'
import { map, prop, take } from 'rambdax'

async function getScrapedRepos(repo, fileName, shouldRefresh){
  const filePath = `${__dirname}/${fileName}-scraped.json`

  if(!shouldRefresh && !existsSync(filePath)){
    throw new Error('!exists')
  }

  if(!shouldRefresh && existsSync(filePath)){
    const {data} = await readJson(filePath)
    return data
  }

  const scrapedRepos = await sortUsedBy(repo)
  await outputJson(filePath, {data: scrapedRepos}, {spaces: 2})

  return scrapedRepos
}

async function getApiData(repos, fileName, shouldRefresh){
  const filePath = `${__dirname}/${fileName}-api-data.json`
  
  if(!shouldRefresh && !existsSync(filePath)){
    throw new Error('!exists')
  }
  
  if(!shouldRefresh && existsSync(filePath)){
    const {data} = await readJson(filePath)
    return data
  }
  const apiData = await getRepoData({repos })
  await outputJson(filePath, {data: apiData}, {spaces: 2})

  return apiData
}

export async function buildStarsOf(repo, shouldRefreshScraped = true, shouldRefreshApi = true){
  const fileName = kebabCase(repo)
  const scrapedRepos = await getScrapedRepos(repo, fileName, shouldRefreshScraped)
  
  const repos = map(prop('repo'), scrapedRepos)
  const apiData = await getApiData(take(7, repos), fileName, shouldRefreshApi)
  
}