import { init } from './init'
import { type } from 'rambdax'
test('', () =>{
  const result = init("/home/just/repos/is/src/test.d.ts")
  const expectedResult = true

  expect(
    type(result)
  ).toEqual('Object')
})