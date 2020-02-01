import axios from 'axios'
import {head, last} from 'rambdax'
import { url } from '../_helpers/url'
import { ADMIN_PASSWORD } from '../constants'

const URL = `${url('define')}/word-definition`

export async function getDefinitionRequest(
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

export async function getDefinition(
  currentInstance: any,
  mode: string,
): Promise<string[]> {
  try {
    const textRaw = head<string>(
      currentInstance[`${mode}Word`].split(','),
    )
    const word = last(textRaw.split(' '))

    return getDefinitionRequest(mode, word)
  } catch (e) {
    console.log(e)
    throw e
  }
}
