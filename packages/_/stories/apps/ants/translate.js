import { API_URL } from '../../constants'
import { post } from 'axios'

export async function translateAnt(input, password){
  const { data } = await post(`${ API_URL }/translate`, {
    password : password,
    payload  : { text : input },
  })

  return data
}
