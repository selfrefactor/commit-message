import { getCustomLabels } from '../src/modules/getCustomLabels'
import {type} from 'rambda'

test('', () => {
  const result = getCustomLabels()

  expect(
    type(result),
  ).toEqual('Object')
  
  expect(
    type((result as any).labels),
  ).toEqual('Array')
})

