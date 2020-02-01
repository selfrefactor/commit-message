import { API_URL } from '../../constants'
import { post } from 'axios'
import { wait } from 'rambdax'

export async function getNewInstance(payload){
  const [ response, err ] = await wait(
    post(`${ API_URL }/random-word/`, payload)
  )

  if (err){
    console.log(err)
    throw new Error('getNewInstance')
  }

  return response.data
}
