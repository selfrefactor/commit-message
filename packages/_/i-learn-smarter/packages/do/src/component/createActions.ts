import { resolve } from 'path'
import { camelCase, constantCase } from 'string-fn'
import { outputFileSync } from '../_modules/outputFileSync'
import { textToJs } from '../_modules/textToJs'

export function createActions(input: ExtendedComponentInput) {
  const templateLocation = resolve(
    __dirname,
    '../../templates/component/actions.txt',
  )

  const emptyTemplateLocation = resolve(
    __dirname,
    '../../templates/component/actionsEmpty.txt',
  )

  const action = camelCase(input.firstEpicStarter)

  const actionsContent = textToJs(
    templateLocation, 
    [input.constantKey, action]
  )
  
  outputFileSync(
    input.actionsLocation,
    actionsContent,
  )

  return actionsContent
}
