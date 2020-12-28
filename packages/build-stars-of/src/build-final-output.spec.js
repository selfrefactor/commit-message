import { data } from './assets/selfrefactor-rambda-api-data'
import { buildFinalOutput } from './build-final-output'

test('happy', () => {
  const input = {
    repo  : 'selfrefactor/rambda',
    title : 'Stars of **Rambda** list',
    data,
  }
  expect(buildFinalOutput(input)).toMatchSnapshot()
})
