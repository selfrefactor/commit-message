const { resolve } = require('path')
const { map } = require('rambdax')
const BASE = resolve(__dirname, '../../all-stars-of/')

const shouldRefreshScraped = true
const shouldRefreshApi = true

const playwright = {
  priority: 0,
  repo: 'microsoft/playwright',
  title : 'Stars of **Playwright**',
  stars:3
}

const rambda = {
  priority: 0,
  repo: 'selfrefactor/rambda',
  title : 'Stars of **Rambda** list',
  stars: 2
}

const iterator = (x, prop) => {
  return {
    ...x,
    starsLimit: x.stars ? x.stars : 5,
    shouldRefreshApi,
    shouldRefreshScraped,
    outputLocation: `${BASE}/stars-of-${prop}.md`
  }
}

const allModes = map(
  iterator,
  {rambda, playwright}
)

exports.allModes = allModes