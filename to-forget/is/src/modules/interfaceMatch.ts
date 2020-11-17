import { has } from 'rambdax'
import { is } from '../'

export function interfaceMatch(methodInput: InterfaceMatchInput): boolean {
  const { input, schema, interfaces } = methodInput
  const thisInterface = interfaces[schema]

  for (const prop in input) {
    if (!has(prop, thisInterface)) {

      return false
    }

    const isResult = is(input[prop], thisInterface[prop])

    if (!isResult) {

      return false
    }
  }

  return true
}
