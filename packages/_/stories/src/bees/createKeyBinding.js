import { ok } from 'rambdax'

export function createKeyBindingBee({ label, callback, firstKey, secondKey }){
  ok(label, callback, firstKey, secondKey)(String, 'function', String, String)

  return ({ key }) => {
    if (key === firstKey){
      return setter(label, true)
    } else if (key === secondKey && getter(label)){
      callback()

      return setter(label, false)
    } else if (!getter(label)){
      return setter(label, false)
    }
  }
}
