import { API_URL } from '../../constants'
import { post } from 'axios'

export async function wordProfileAddAnt(input, token){
  const { data } = await post(`${ API_URL }/word-profile/add/${ input }`, { token })

  return data
}
