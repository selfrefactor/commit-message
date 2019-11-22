import { reject, and, transpose } from 'rambda'

const morebs = transpose([[1,2],[],[1,2,3],[3]])
console.log({morebs})
const bs = and(1)(2)

const a = reject((a,c)=> a > 1, [1,2,3])

interface Input{
  a: number
  b: string
  c: boolean
}

type PartialInput = Pick<Input, Exclude<keyof Input, "c">>;
function fn(input: Input){
  return input.c ? input.a: input.b
}

interface Foo {
  [key: string]: string[]
}

const foo: Foo = {
  bar: ['1', '2', '3'],
}

// const curried = partialCurry<Input, PartialInput, string|number>(fn, {a:1, b:'foo'});  
// curried // $ExpectType (input: Pick<Input, "c">) => string | number

// const result = curried({c:false}) 
// result// $ExpectType string | number

// const partialInput = {a:1}
// type B = Exclude<keyof Input, keyof PartialInput>