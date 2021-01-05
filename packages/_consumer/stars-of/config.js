const { resolve } = require('path')
const { map } = require('rambdax')
const BASE = resolve(__dirname, '../../all-stars-of/')

const shouldRefreshScraped = true
const shouldRefreshApi = true

const playwright = {
  priority: 0,
  daysLimit: 200,
  repo: 'microsoft/playwright',
  title : 'Stars of **Playwright**',
  stars:3
}
const puppeteer = {
  priority: 2,
  daysLimit: 100,
  repo: 'puppeteer/puppeteer',
  title : 'Stars of **Puppeteer**',
  stars:15
}
const nest = {
  priority: 2,
  daysLimit: 260,
  repo: 'nestjs/nest',
  title : 'Stars of **Nest.js**',
  stars:4
}
const angular = {
  priority: 0,
  daysLimit: 120,
  repo: 'angular/angular',
  title : 'Stars of **Angular** - all-you-can-take frontend framework',
  stars:20
}

const rambda = {
  priority: 1,
  repo: 'selfrefactor/rambda',
  title : 'Stars of **Rambda** list',
  stars: 2
}
const ramda = {
  priority: 1,
  repo: 'ramda/ramda',
  title : 'Stars of **Ramda** list',
  stars: 2
}

const iterator = (x, prop) => {
  return {
    ...x,
    daysLimit: x.daysLimit ? x.daysLimit : 370,
    starsLimit: x.stars ? x.stars : 5,
    shouldRefreshApi,
    shouldRefreshScraped,
    outputLocation: `${BASE}/stars-of-${prop}.md`
  }
}

const allModes = map(
  iterator,
  {rambda, playwright, puppeteer, ramda, nest, angular}
)

exports.allModes = allModes