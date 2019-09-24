import {
  find,
  replace,
} from 'rambdax'

import { resolve } from 'path'
import { camelCase, constantCase, dotCase, pascalCase } from 'string-fn'
import { outputFileSync } from '../_modules/outputFileSync'
import { textToJs } from '../_modules/textToJs'

/**
 * Instead of NamespacingOutput we set it to Namespacing
 * as there are no other competing interfaces
 */
interface Namespacing {
  isLocal: boolean
  constantValue: string
}

function namespacing(input: EpicBasicInput): Namespacing {
  const allComponents = input.allComponents.map(dotCase)

  const whichFolder = find(
    _ => input.starterAction.startsWith(_),
    allComponents,
  )

  const actionIsRoot = whichFolder === 'root'
  const isLocal = input.starterAction.startsWith(whichFolder)

  const partToRemove = actionIsRoot ?
    '' :
    `${whichFolder}.`

  const withoutFolder = replace(
    partToRemove,
    '',
    input.starterAction,
  )

  const constantValue = actionIsRoot ?
    constantCase(input.starterAction) :
    `${camelCase(input.folder)}@${constantCase(withoutFolder)}`

  return { constantValue, isLocal }
}

/**
 * Creates a new simple epic that starts with `starterAction`
 * It also sets variables needed to build `EpicInput`
 */
export function createEpic(input: EpicBasicInput): EpicCreatedEpic {
  const templateLocation = resolve(
    __dirname,
    '../../templates/component/epic.txt',
  )

  const { constantValue, isLocal } = namespacing(input)

  const constantName = constantCase(input.starterAction)
  const epicName = camelCase(`${input.name}.epic`)
  const epicNameInTemplate = camelCase(input.name)
  const actionName = pascalCase(`${input.starterAction}.action`)

  const content = textToJs(
    templateLocation,
    [constantName, epicNameInTemplate, actionName],
  )

  outputFileSync(
    input.epicLocation,
    content,
  )

  return {
    actionName,
    constantName,
    constantValue,
    epicName,
    isLocal,
  }
}
