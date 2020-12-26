import { getRepo } from './get-repo'
import {envFn} from 'env-fn'
envFn('special')

test('happy', async () => {
  expect(
    await getRepo('selfrefactor/rambda')
  ).toMatchSnapshot()
})