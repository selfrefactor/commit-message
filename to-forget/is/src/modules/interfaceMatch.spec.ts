import { interfaceMatch } from './interfaceMatch'

test('', () =>{
  const input = {
    a:1,
    b:"baz",
    c:["foo","bar"]
  }

  const inputSecond = {
    ...input,
    d: [1]
  }
  const schema = 'Foo'
  const FooInterface = { a: 'number', b: 'string', c: 'string[]' }
  const BarInterface = { x: 'boolean', y: 'string', z: 'boolean[]' }
  const interfaces = { Foo: FooInterface, Bar: BarInterface  }
  const result = interfaceMatch({input,schema,interfaces})
  const resultSecond = interfaceMatch({input: inputSecond,schema,interfaces})
  const expectedResult = true

  expect(
    result
  ).toEqual(expectedResult)
  
  expect(
    resultSecond
  ).toBeFalsy()
})