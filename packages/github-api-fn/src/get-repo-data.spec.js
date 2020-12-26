import { envFn } from 'env-fn'
import { ok } from 'rambdax'
import { ms } from 'string-fn'
envFn('special')
import { getRepoData } from './get-repo-data'
jest.setTimeout(ms('1min'))

const repos = [ 'selfrefactor/on', 'selfrefactor/rambdax' ]
const input = {
  repos,
  cacheLocation : `${ __dirname }/cache.json`,
  refreshCache  : true,
}

test('happy', async () => {
  const result = await getRepoData(input)
  ok(result)(Array)
  expect(
    result
  ).toMatchSnapshot()
})
