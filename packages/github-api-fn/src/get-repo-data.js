const { existsSync } = require('fs')
const { mapAsync, ok, pick } = require('rambdax')
const { outputJson, readJson } = require('fs-extra')

const { filterRepo, dateDiff } = require('./_modules/filter-repo')
const { getRepo } = require('./_modules/get-repo')
const cacheLocation = `${ __dirname }/cache.json`

async function getRepoData(input){
  ok(input)({ repos : [ String ] })
  const { repos, refreshCache = true } = input
  const reposOk = repos.filter(x => x.includes('/')).length === repos.length
  if (!reposOk) throw new Error(`Wrong repos input - ${ repos }`)

  if (refreshCache){
    const reposData = await mapAsync(async repo => {
      const repoDataResponse = await getRepo(repo)
      const filterData = await filterRepo(repo, input.daysLimit)
      const propsToPick = [
        'full_name',
        'description',
        'stargazers_count',
        'forks_count',
        'open_issues_count',
        'pushed_at',
        'updated_at',
        'subscribers_count',
      ]
      const repoData = pick(propsToPick, repoDataResponse)

      return {
        repoData,
        repoUrl : repo,
        filterData,
        pushedDiff: dateDiff(repoData.pushed_at),
        updatedDiff: dateDiff(repoData.updated_at),
      }
    }, repos)
    await outputJson(
      cacheLocation, { data : reposData }, { spaces : 2 }
    )

    return reposData
  }
  if (existsSync(cacheLocation)){
    const { data } = await readJson(cacheLocation)

    return data
  }
  throw new Error('cache is missing')
}

exports.getRepoData = getRepoData
