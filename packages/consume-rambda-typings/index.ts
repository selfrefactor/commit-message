import { reject } from 'rambda'

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

// const curried = partialCurry<Input, PartialInput, string|number>(fn, {a:1, b:'foo'});  
// curried // $ExpectType (input: Pick<Input, "c">) => string | number

// const result = curried({c:false}) 
// result// $ExpectType string | number

// const partialInput = {a:1}
// type B = Exclude<keyof Input, keyof PartialInput>