import { ms } from 'string-fn'
import { buildStarsOf } from './build-stars-of'

jest.setTimeout(ms('10 minutes'))

test('happy', async () => {
  await buildStarsOf('selfrefactor/rambda', false)
})