import { add } from 'rambdax'

export function fn(x){
  return add(1, x)
}

console.log(fn(2));