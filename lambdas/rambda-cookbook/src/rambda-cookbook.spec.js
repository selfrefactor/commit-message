import { rambdaCookbook } from './rambda-cookbook'

test('happy', async () => {
  await rambdaCookbook()
  expect(
    1 
  ).toBeTruthy()
})