import axios from 'axios'
import { replace } from 'rambdax'

const URL = `http://localhost:8080/translate`

interface Input {
  language: string
  text: string
  password: string
}

/**
 * Translate text from English as a source
 */
export async function getTranslation(input: Input): Promise<string> {
  const body = {
    payload: {
      from: 'en',
      text: input.text,
      to: input.language,
    },
    token: input.password,
  }
  try {
    if (input.text === '') { return '' }

    const { data } = await axios.post(URL, body)

    return replace('▼', '', data).trim()
  } catch (e) {
    console.log(e)
    return ''
  }
}

/**
 * Translate text from German as a source
 */
export async function getGermanTranslation(password, text): Promise<string> {
  const body = {
    payload: {
      from: 'de',
      text,
      to: 'en',
    },
    token: password,
  }
  try {
    const { data } = await axios.post(URL, body)

    return data
  } catch (e) {
    console.log(e)
    return ''
  }
}
