import {
  camelCase,
  constantCase,
  pascalCase,
} from 'string-fn'

import {
  ACTION_INTERFACES_MARKER,
  CONSTANTS_MARKER,
  GET_STATE_MARKER,
  INJECT_COMPONENT_MARKER,
} from './../constants'

import { readFileSync } from 'fs'
import { replace } from 'rambdax'
import { outputFileSync } from '../_modules/outputFileSync'
import { actionTypingsTemplate } from '../_templates/actionTypings'
import { constantTypingsTemplate } from '../_templates/constantTypings'
import { propsTypingsTemplate } from '../_templates/propsTypings'

/**
 * Edit typings.d.ts to include new store; its props;
 * action interfaces; constants-like types;
 */
export function editTypings(input: ExtendedComponentInput): void {
  let typingsContent = readFileSync(input.typingsLocation).toString()
  const STORE_INTERFACE = pascalCase(`${input.name}.store`)
  const STORE_PROP = camelCase(`${input.name}.store`)

  const hasOwnStore = input.storeType !== 'ROOT_STORE'
  
  /**
   * It has its own store that needs to be declared
   */
  if (hasOwnStore) {

    typingsContent = replace(
      INJECT_COMPONENT_MARKER,
      propsTypingsTemplate(input, STORE_PROP, STORE_INTERFACE),
      typingsContent,
    )
  }

  const getStateStatement = `${STORE_PROP}?: ${STORE_INTERFACE},`
  const getStateInjection = `${GET_STATE_MARKER}\n  ${getStateStatement}`

  const hasMarker = typingsContent.includes(GET_STATE_MARKER)
  const withoutGetState = !typingsContent.includes(getStateStatement)

  const ok = hasOwnStore && hasMarker && withoutGetState 

  if (ok) {

    typingsContent = replace(
      GET_STATE_MARKER,
      getStateInjection,
      typingsContent,
    )
  }

  const namespacedFirstEpicStarter = `${input.name}.${input.firstEpicStarter}`

  const actionName = pascalCase(`${namespacedFirstEpicStarter}.action`)
  const actionType = constantCase(namespacedFirstEpicStarter)

  const actionTypeHead = camelCase(input.name)
  const actionTypeTail = constantCase(input.firstEpicStarter)
  const actionTypeValue = `${actionTypeHead}@${actionTypeTail}`

  /**
   * Spaces around `actionType` is to ensure not a substring is matched
   */
  if (!typingsContent.includes(` ${actionType} `)) {

    typingsContent = replace(
      CONSTANTS_MARKER,
      constantTypingsTemplate(
        actionType,
        actionTypeValue,
        typingsContent,
      ),
      typingsContent,
    )
  }

  if (!typingsContent.includes(` ${actionName} `)) {

    typingsContent = replace(
      ACTION_INTERFACES_MARKER,
      actionTypingsTemplate(
        actionName,
        actionType,
        typingsContent,
      ),
      typingsContent,
    )
  }

  outputFileSync(
    input.typingsLocation,
    typingsContent,
  )
}
