import { any } from 'rambdax'
import { removeSquareBrackets } from './removeSquareBrackets'

export function isInterfaceMatch(schema: string, interfaces: object): boolean {
  const interfacesKeys = Object.keys(interfaces)
  if (interfacesKeys.length === 0) {

    return false
  }
  const normalizedSchema = removeSquareBrackets(schema)

  return any(
    singleKey => singleKey === normalizedSchema,
    interfacesKeys,
  )
}
