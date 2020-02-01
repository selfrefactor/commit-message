import axios from 'axios'
import {
  head,
  last,
} from 'rambdax'
import { ADMIN_PASSWORD } from '../constants'

const URL = `http://localhost:8080/related-words`

export async function getRelatedRequest(
  from: string,
  word: string,
): Promise<string[]> {
  const password = localStorage.getItem(ADMIN_PASSWORD)
  const body = {
    payload: {
      from,
      text: word,
    },
    token: password,
  }

  const { data } = await axios.post(URL, body)

  return data
}

export async function getRelated(
  currentInstance: any,
  mode: string,
): Promise<string[]> {
  try {
    const key = `${mode}Word`
    const textRaw = head<string>(
      currentInstance[key].split(','),
    )
    const word = last(textRaw.split(' '))

    return getRelatedRequest(mode, word)
  } catch (e) {
    console.log(e)
    throw e
  }
}
