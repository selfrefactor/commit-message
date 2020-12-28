const { resolve } = require('path')
const { map } = require('rambdax')
const BASE = resolve(__dirname, '../../all-stars-of/')

const shouldRefreshScraped = true
const shouldRefreshApi = true

const playwright = {

}

const rambda = {
  repo: 'selfrefactor/rambda',
  title : 'Stars of **Rambda** list',
}

const iterator = (x, prop) => {
  return {
    ...x,
    shouldRefreshApi,
    shouldRefreshScraped,
    outputLocation: `${BASE}/stars-of-${prop}.md`
  }
}

const allModes = map(
  iterator,
  {rambda}
)

exports.allModes = allModes