import { array } from './array'

test('', () =>{
  const result = array(["foo","bar"], "string[]")
  const expectedResult = true

  expect(
    result
  ).toEqual(expectedResult)
})

test('', () =>{
  const result = array([1,2], "number[]")
  const expectedResult = true

  expect(
    result
  ).toEqual(expectedResult)
})