import {german} from './'
import { type } from 'rambdax'

test('', async () => {
  const result = await german('mehr')

  expect(
    type(result)
  ).toBe('Array')
  
  expect(
    type(result[0])
  ).toBe('String')
  
  expect(
    result.length
  ).toBeGreaterThan(5)
})