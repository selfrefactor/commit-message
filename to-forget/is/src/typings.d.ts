type SimpleSchema = 'string' |
  'array' |
  'object' |
  'null' |
  'boolean' |
  'promise' |
  'function' |
  'any' |
  'undefined'

type ArraySchema = 'string[]' |
  'object[]' |
  'boolean[]' |
  'promise[]' |
  'async[]' |
  'any[]' |
  'function[]'

interface InterfaceMatchInput {
  input: any
  interfaces: object
  schema: string
}

interface DescriptionOutput {
  key: string|false
  strictKey: string
  strictValue: string
  value: string|false
}

interface InitResult{
  interfaces: object
  allInterfaces: object
}
