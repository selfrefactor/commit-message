import env from 'env-fn'
env('special')

import { bulgarian } from './'
import { post } from 'axios'

const url = `${process.env.SERVICE_URL}/related-words`

test.only('prod', async () => {
  const body = {
    token: process.env.API_ACCESS_TOKEN,
    payload: {
      from: 'BG',
      text: 'решението',
    }
  }

  const result = await post(url, body)
  console.log(result.data)

  expect(true).toBeTruthy()
})

test('local', async () =>{
  const result = await bulgarian("друго")
  console.log(result);

  expect(1).toEqual(1)
})