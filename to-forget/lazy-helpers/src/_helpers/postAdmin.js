import { merge } from 'rambdax'
import { post } from './post'

export async function postAdmin(input) {
  const token = process.env.API_ACCESS_TOKEN

  const body = merge(input.body, { token })
  const url = `${process.env.NGROK_URL}/${input.route}`

  return post({
    body,
    url,
  })
}
