const supported = [
  'string',
  'array',
  'object',
  'number',
  'null',
  'any',
  'boolean',
  'promise',
  'function',
  'undefined',
]

import { any } from 'rambdax'

export function isSimpleSchema(schema: string): schema is SimpleSchema {

  return any(
    supportedInstance => supportedInstance === schema,
    supported,
  )
}
