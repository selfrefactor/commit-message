import { post } from 'axios'

const apiUrl = 'https://sketch.notary294.bg/notary/'
// const apiUrl = 'http://localhost:3010/notary/foo-bar/test'

export async function postRequest(payload){
  const { data } = await post(apiUrl, { payload })

  return data.notary
}
