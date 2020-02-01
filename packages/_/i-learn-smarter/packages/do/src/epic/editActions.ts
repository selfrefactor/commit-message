import { readFileSync } from 'fs-extra'
import { log } from 'log'
import { replace } from 'rambdax'

import { camelCase, dotCase } from 'string-fn'
import { outputFileSync } from '../_modules/outputFileSync'
import { ACTIONS_MARKER, IMPORT_CONSTANTS_MARKER } from '../constants'

/**
 * Create new action in case that we are in local namespace
 */
export function editActions(input: EpicInput): void {
  if (!input.isLocal) {

    return
  }

  const content = readFileSync(input.actionsLocation).toString()

  const includesMarker = content.includes(IMPORT_CONSTANTS_MARKER)
  const includesConstant = content.includes(input.constantName)

  if (!includesMarker || includesConstant) {
    log({includesMarker, includesConstant}, 'pattern')

    return
  }

  const injectionImport = `${IMPORT_CONSTANTS_MARKER}\n  ${input.constantName},`
  const withImport = replace(
    IMPORT_CONSTANTS_MARKER,
    injectionImport,
    content,
  )

  /**
   * Turn `select.article.click` to `click`
   */
  const actionNameBase = replace(
    dotCase(input.folder),
    '',
    input.starterAction
  )

  const actionName = camelCase(actionNameBase)

  const statement = `export const ${actionName} = createAction(${input.constantName})`
  const injectionAction = `${ACTIONS_MARKER}\n${statement}`

  const newContent = replace(
    ACTIONS_MARKER,
    injectionAction,
    withImport,
  )

  outputFileSync(
    input.actionsLocation,
    newContent,
  )
}
