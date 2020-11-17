import { any } from 'rambdax'
import { removeSquareBrackets } from './removeSquareBrackets'

export function isInterfaceListMatch(schema: string, interfaces: object): boolean {
  const interfacesKeys = Object.keys(interfaces)

  if (interfacesKeys.length === 0 || !schema.endsWith('[]')) {

    return false
  }
  const normalizedSchema = removeSquareBrackets(schema)

  return any(
    singleKey => singleKey === normalizedSchema,
    interfacesKeys,
  )
}
