import { envFn } from 'env-fn'
envFn('special')
import { ms } from 'string-fn'

import { buildStarsOf } from './build-stars-of'

jest.setTimeout(ms('30 minutes'))

test('happy', async () => {
  const repo = 'selfrefactor/rambda'
  const input = {
    repo,
    title : 'Stars of **Rambda** list',
    shouldRefreshScraped: false,
    shouldRefreshApi: false,
    outputLocation: `${__dirname}/assets/stars-of-rambda.md`
  }
  await buildStarsOf(input)
})
