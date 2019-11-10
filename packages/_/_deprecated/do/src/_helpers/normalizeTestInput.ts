import { switcher, type } from 'rambdax'
// Defines when input is interface
const LIMIT = 3

/**
 * Stringify according to the type of input
 */
export function normalize(input: any): string {

  return switcher<string>(type(input))
    .is('Array', JSON.stringify(input))
    .is('Object', JSON.stringify(input))
    .is('Null', 'null')
    .is('Undefined', 'undefined')
    .default(input)
}

/**
 * testInput is object or undefined
 */
export function normalizeTestInput(testInput: any) {
  if (testInput === undefined) {
    return ''
  }

  if (Object.keys(testInput).length < LIMIT) {
    return Object.keys(testInput)
      .map(testArgument => normalize(testInput[testArgument]))
      .join(', ')
  }

  const typeOfInput = type(testInput)
  const shouldStringify = ['Array', 'Object'].includes(typeOfInput)

  return shouldStringify ? JSON.stringify(testInput) : testInput
}
