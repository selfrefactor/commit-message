import env from 'env-fn'
env('special')

import { english } from './'

function assert(){}

test.skip('', async () =>{
  const result = await english("more")
  console.log(result);
  expect(
    result.length
  ).toBeGreaterThan(3)
})

test('', async () =>{
  const result = await english("more")
  console.log(result);
  expect(
    result
  ).toBeGreaterThan(3)
})