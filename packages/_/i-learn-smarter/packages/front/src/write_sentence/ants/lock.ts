import { last } from 'rambdax'

export function lockAnt(store, e){
  const char = last<string>(e.target.value).toLowerCase()
  const expected = store
    .question[store.index]
    .hidden[e.target.value.length - 1]

  if (expected === undefined) return false

  return char === expected.toLowerCase()
}
