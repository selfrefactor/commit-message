import {
  askStoreLoopStart,
  askStorePropInitial,
  askStorePropName,
  askStorePropTyping,
} from './../_ask/component'

import { switcher } from 'rambdax'
import { camelCase } from 'string-fn'
import { normalizeInput } from '../_helpers/normalizeInput'

/**
 * Allow use of shorter version of types
 */
function normalizePropTyping(propTypingRaw: string): string {

  return switcher<string>(propTypingRaw)
    .is('str', 'string')
    .is('obj', 'object')
    .is('num', 'number')
    .is('bool', 'boolean')
    .default(propTypingRaw)
}

/**
 * User input sets initial state and store description
 */
export async function askStore(): Promise<AskStoreOutput> {
  const initialState = {}
  const interfaceProps = []
  let loopFlag = true

  while (loopFlag) {
    const storeLoopStart = await askStoreLoopStart()

    if (storeLoopStart === 'DONE') {
      loopFlag = false
      continue
    }

    const propNameRaw = await askStorePropName()
    const propName = camelCase(propNameRaw)
    
    const propTypingRaw = await askStorePropTyping()
    const propTyping = normalizePropTyping(propTypingRaw)
    
    const isOptional = storeLoopStart === 'ADD_OPTIONAL_PROP'
    const connector = isOptional ? '?:' : ':'

    interfaceProps.push(`${propName}${connector} ${propTyping}`)

    if (!isOptional) {
      const propInitial = await askStorePropInitial()
      initialState[propName] = normalizeInput(propInitial)
    }

  }

  return { initialState, interfaceProps }
}
