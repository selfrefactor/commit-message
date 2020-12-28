import { envFn } from 'env-fn'
envFn('special')
import { ms } from 'string-fn'

import { buildStarsOf } from './build-stars-of'

jest.setTimeout(ms('30 minutes'))

const repo = 'selfrefactor/rambda'
// const repo = 'microsoft/playwright'

test('happy', async () => {
  await buildStarsOf(
    // repo, false, true
    repo
  )
})
