import { filterRepo } from './filter-repo'
import {envFn} from 'env-fn'
envFn('special')

test('happy', async () => {
  expect(
    await filterRepo('selfrefactor/rambda')
  ).toMatchSnapshot()
})

test('no package.json', async () => {
  expect(
    await filterRepo('selfrefactor/commit')
  ).toMatchSnapshot()
})