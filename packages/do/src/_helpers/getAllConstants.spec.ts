import { resolve } from 'path'
import { getAllConstants } from './getAllConstants'

const demoReactLocation = resolve(
  __dirname,
  '../../demoReact/constants.ts',
)

test('', () => {
  const result = getAllConstants(demoReactLocation)
  const expectedResult = true

  expect(
    result,
  ).is('string[]')
})
