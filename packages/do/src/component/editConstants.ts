import { readFileSync } from 'fs'
import { replace } from 'rambdax'
import { constantCase } from 'string-fn'
import { log } from 'helpers'

import { getAllConstants } from '../_helpers/getAllConstants'
import { outputFileSync } from '../_modules/outputFileSync'
import { INJECT_COMPONENT_MARKER } from './../constants'

export function editConstants(input: ExtendedComponentInput): void {
  
  const allConstants = getAllConstants(input.constantsLocation)
  const alreadyExists = allConstants.includes(input.constantKey)

  if (alreadyExists) {
    log({alreadyExists, _:editConstants.name}, 'pattern')
    
    return
  }
  
  const content = readFileSync(input.constantsLocation).toString()
  const ok = content.includes(INJECT_COMPONENT_MARKER)
  
  if(!ok){
    log({ok, _:editConstants.name}, 'pattern')

    return
  }

  const injection = `${INJECT_COMPONENT_MARKER}
// ${constantCase(input.name)}
export const ${input.constantKey} = '${input.constantValue}'`

  const newContent = replace(
    INJECT_COMPONENT_MARKER,
    injection,
    content,
  )

  outputFileSync(input.constantsLocation, newContent)
}
