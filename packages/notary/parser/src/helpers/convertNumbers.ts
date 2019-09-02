import { match } from 'rambdax'

const conversionList = [
  'нула',
  'едно',
  'две',
  'три',
  'четири',
  'пет',
  'шест',
  'седем',
  'осем',
  'девет',
]

function convert(char: string) {
  return char === '.' ?
    'точка' :
    conversionList[Number(char)]
}

export function convertNumbers(input: string): any {
  const convertedList = input.split('').map(convert)

  return convertedList.join(', ')
}
