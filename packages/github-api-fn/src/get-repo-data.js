import { mapAsync, ok, pick } from 'rambdax'
import { outputJson, readJson } from 'fs-extra'

import { getRepo } from './_modules/get-repo'
import { existsSync } from 'fs'
import { filterRepo } from './_modules/filter-repo'

export async function getRepoData(input){
  ok(input)({
    repos         : [ String ],
    cacheLocation : String,
  })
  const { repos, cacheLocation, refreshCache = true } = input
  const reposOk = repos.filter(x => x.includes('/')).length === repos.length
  if (!reposOk) throw new Error(`Wrong repos input - ${ repos }`)
  if (!cacheLocation.endsWith('.json')){
    throw new Error('cache location needs to end with `.json`')
  }
  if (refreshCache){
    const reposData = await mapAsync(async repo => {
      const repoDataResponse = await getRepo(repo)
      const filterData = await filterRepo(repo)
      const propsToPick = 'full_name,description,stargazers_count,forks_count,open_issues_count,pushed_at,updated_at,subscribers_count'
      const repoData = pick(propsToPick, repoDataResponse)
      return {repoData, repoUrl: repo, filterData}
    }, repos)
    await outputJson(
      cacheLocation, { data : reposData }, { spaces : 2 }
    )
    return reposData
  }
  if(existsSync(cacheLocation)){
    const {data} = await readJson(cacheLocation)

    return data
  }
  throw new Error('cache is lost')
}
