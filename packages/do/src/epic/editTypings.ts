import { readFileSync } from 'fs-extra'
import { log } from 'helpers'
import { replace } from 'rambdax'
import { outputFileSync } from '../_modules/outputFileSync'

import { actionTypingsTemplate } from '../_templates/actionTypings'
import { constantTypingsTemplate } from '../_templates/constantTypings'
import { ACTION_INTERFACES_MARKER, CONSTANTS_MARKER } from './../constants'

/**
 * Adds constant-like type and action interface
 */
export function editTypings(input: EpicInput): string {
  const content = readFileSync(input.typingsLocation).toString()

  const hasConstants = content.includes(CONSTANTS_MARKER)
  const hasInterfaces = content.includes(ACTION_INTERFACES_MARKER)

  if (!hasConstants || !hasInterfaces){
    log({hasConstants, hasInterfaces}, 'pattern')

    return
  }

  const withConstants = replace(
    CONSTANTS_MARKER,
    constantTypingsTemplate(
      input.constantName,
      input.constantValue,
      content,
    ),
    content,
  )

  const newContent = replace(
    ACTION_INTERFACES_MARKER,
    actionTypingsTemplate(
      input.actionName,
      input.constantName,
      content,
    ),
    withConstants,
  )

  outputFileSync(
    input.typingsLocation,
    newContent,
  )
}
