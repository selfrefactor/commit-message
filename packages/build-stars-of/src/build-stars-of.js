import {sortUsedBy} from 'sort-used-by'
import {getRepoData} from 'github-api-fn'
import {outputJson, readJson} from 'fs-extra'
import { kebabCase } from 'string-fn'
import { existsSync } from 'fs'

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

export async function buildStarsOf(repo, shouldRefresh = true){
  const fileName = kebabCase(repo)
  const scrapedRepos = await getScrapedRepos(repo, fileName, shouldRefresh)
}