import { envFn } from 'env-fn'
envFn('special')
import { ms } from 'string-fn'

import { buildStarsOf } from './build-stars-of'

jest.setTimeout(ms('20 minutes'))

test('happy', async () => {
  await buildStarsOf(
    'selfrefactor/rambda', false, false
  )
})
