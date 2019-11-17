import { translateWithDecimal } from './translateWithDecimal';

export function normalizeAcreage(input: string){
  const [ floatNumber, merit] = input.split(' ')
  const translated = translateWithDecimal(floatNumber)

  return `${translated} ${merit}`  
}