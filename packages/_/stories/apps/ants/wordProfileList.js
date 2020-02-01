import { API_URL } from '../../constants'
import { post } from 'axios'

export async function wordProfileListAnt(token){
  const { data } = await post(`${ API_URL }/word-profile/list`, { token })

  return data
}
