import { envFn } from 'env-fn'
import { ok } from 'rambdax'
import { ms } from 'string-fn'
envFn('special')
import { getRepoData } from './get-repo-data'
jest.setTimeout(ms('2 minutes'))

const repos = [ 
  'evanw/esbuild',
  'VerbalExpressions/JSVerbalExpressions',
  'aposin/ng-aquila',
  'g-plane/type-gymnastics',
  'WolkSoftware/tsmod'
]
const input = {
  repos,
  cacheLocation : `${ __dirname }/cache.json`,
  refreshCache  : true,
}

test('happy', async () => {
  const result = await getRepoData(input)
  expect(
    result
  ).toMatchSnapshot()
  ok(result)(Array)
})
