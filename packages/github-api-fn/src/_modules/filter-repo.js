const axios = require('axios')
import dayjs from 'dayjs'
import { path } from 'rambdax'

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

export async function filterRepo(repo){
  const token = process.env.GITHUB
  if (!token) throw new Error('!token')
  if (!repo.includes('/')) throw new Error(`wrong repo input - ${ repo }`)
  const url = `https://api.github.com/repos/${ repo }/commits?path=${ FILE }&page=1&per_page=1`
  const { data } = await axios({
    method  : 'get',
    url,
    timeout : 7000,
    headers : { Authorization : `token ${ process.env.GITHUB }` },
  })
  if (data.length === 0){
    return FALLBACK
  }
  const updateDate = path('commit.committer.date', data[ 0 ])

  const diff = dateDiff(updateDate)

  return {
    pass       : diff < DAYS_LIMIT,
    updateDate,
    updateDiff : diff,
  }
}
