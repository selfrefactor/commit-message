const supported = [
  'any[]',
  'async[]',
  'boolean[]',
  'function[]',
  'number[]',
  'object[]',
  'promise[]',
  'string[]',
]

import { any } from 'rambdax'

export function isArraySchema(schema: string): schema is ArraySchema {

  return any(
    supportedInstance => supportedInstance === schema,
    supported,
  )
}
