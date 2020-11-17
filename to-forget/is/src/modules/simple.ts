import { equals, switcher, type } from 'rambdax'

function isEmpty(input: any, schema: SimpleSchema) {
  return switcher(schema)
    .is('string', equals(input, ''))
    .is('object', equals(input, {}))
    .is('array', equals(input, []))
    .default(false)
}

/**
 * Check for type match and that it is not an empty type
 *
 * @export
 * @param {*} input
 * @param {*} schema
 */
export function simple(input: any, schema: SimpleSchema) {
  if (schema === 'any') {
    return true
  }

  return type(input).toLowerCase() === schema && !isEmpty(input, schema)
}
