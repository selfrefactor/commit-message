import {
  // allPass,
  // anyPass,
  // both,
  // either,
  complement,
} from 'rambda'

const fn1 = (x) => typeof x === 'number'
const fn2 = x => x > 10
const fn3 = x => x +2
const rules = []

const a = complement(fn3)(11)
const b = complement(fn3)(11)

console.log({rules, a,b, fn2, fn1})