import { all, dropLast, type } from 'rambdax'

function isCorrectType(inputInstance: any, schema: ArraySchema) {

  // tslint:disable-next-line
  return type(inputInstance).toLowerCase() === dropLast(2, schema as string)
}

export function array(input: any, schema: ArraySchema): boolean {
  if (type(input) !== 'Array' || input.length === 0) {
    return false
  }
  if (schema === 'any[]') {
    return true
  }

  return all(inputInstance => isCorrectType(inputInstance, schema), input)
}
