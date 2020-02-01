import { putAheadAnt } from './putAhead'

const list = [1,2,3,4]

test('happy', () =>{
  const result = putAheadAnt(list, 3)
  const expectedResult = [4,2,3,1]

  expect(
    result
  ).toEqual(expectedResult)
})

test('index is -1', () =>{
  const result = putAheadAnt(list, -1)

  expect(
    result
  ).toEqual(list)
})
