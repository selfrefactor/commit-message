import { add } from 'rambdax'

interface Foo {
  a: string,
  b: boolean,
}
interface Foox {
  a: string,
  b: boolean,
}

function myFunc(foo: string | null) {
  return foo !== null && foo !== undefined ? foo : 'a string'
}
function myFuncx<T>(foo: T | null) {
  return foo?.['a']?.b?.c
}
const a = add(1, 2)
const aa = add(1, 2)
const aaa: string[] = ['']
const aaaa: string[] = ['']
const b = [1, 2].includes(1)
