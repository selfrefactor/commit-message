import { init, replace, match } from 'rambdax'
import { translateNumber } from './translateNumber'

function normalizeFirstNumber(input: string){
  const matched: string[] = match(/[0-9]+,/, input)

  if(matched.length === 0){
    return input
  }

  const number = Number(init(matched[0]))
  const numberWithWords = translateNumber(number)
  const replacer = `${number}/${numberWithWords}/,`

  return replace(
    /[0-9]+,/,
    replacer,
    input
  )
}

export function normalizeText(input: string){
  const withNormalizedNumber = normalizeFirstNumber(input)

  const clean = replace(
    '\nПредназначение',
    ', предназначение',
    withNormalizedNumber
  )

  const cleaner = replace(
    '\nБрой',
    ', брой',
    clean
  )

  return replace(
    /\n/gm,
    ' ',
    cleaner
  )
}

