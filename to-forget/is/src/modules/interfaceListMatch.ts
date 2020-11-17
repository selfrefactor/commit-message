import { all, type } from 'rambdax'
import { removeSquareBrackets } from '../helpers/removeSquareBrackets'
import { interfaceMatch } from './interfaceMatch'

export function interfaceListMatch(methodInput: InterfaceMatchInput): boolean {
  const { input, schema, interfaces } = methodInput

  if (type(input) !== 'Array') {

    return false
  }

  const normalizedSchema = removeSquareBrackets(schema)

  return all(
    inputInstance => interfaceMatch({
      input: inputInstance,
      interfaces: interfaces,
      schema: normalizedSchema,
    }),
    input,
  )
}
