const axios = require('axios')
const dayjs  = require('dayjs')
const { path, defaultTo }  = require('rambdax')

const DAYS_LIMIT = 370
const FILE = 'package.json'
const FALLBACK = {
  pass       : false,
  updateDate : undefined,
  updateDiff : undefined,
}

function dateDiff(updateDate){
  const now = dayjs(Date.now())
  const past = dayjs(updateDate)

  return now.diff(past, 'day')
}

async function filterRepo(repo, daysLimitInput){
  const daysLimit = defaultTo(DAYS_LIMIT, daysLimitInput)

  const token = process.env.GITHUB
  if (!token) throw new Error('!token')
  if (!repo.includes('/')) throw new Error(`wrong repo input - ${ repo }`)
  const url = `https://api.github.com/repos/${ repo }/commits?path=${ FILE }&page=1&per_page=1`
  const { data } = await axios({
    method  : 'get',
    url,
    timeout : 20000,
    headers : { Authorization : `token ${ process.env.GITHUB }` },
  })
  if (data.length === 0){
    return FALLBACK
  }
  const updateDate = path('commit.committer.date', data[ 0 ])

  const diff = dateDiff(updateDate)

  return {
    pass       : diff < daysLimit,
    updateDate,
    updateDiff : diff,
  }
}

exports.filterRepo = filterRepo
exports.dateDiff = dateDiff