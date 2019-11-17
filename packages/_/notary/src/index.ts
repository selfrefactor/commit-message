import { defaultTo } from 'rambdax'
import { getResult } from './modules/getResult'
import { getText } from './modules/getText'
import { getResultSamostoyatelen } from './samostoyatelen/getResult'

const methods: Methods = {
  SAMOSTOYATELEN: samostoyatelen,
  POZEMLEN: pozemlen,
}

function pozemlen(convertedText: string): string {
  const result = getResult(convertedText)
  const text = getText(result)

  return text
}

function samostoyatelen(convertedText: string): string {

  return getResultSamostoyatelen(convertedText)
}

export async function notary(
  textInput: string,
  modeRaw?: Mode,
): Promise<string> {
  const mode = defaultTo('POZEMLEN', modeRaw)

  if (textInput.length < 100) return ''

  return methods[mode](textInput)
}
