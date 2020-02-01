import { resolve } from 'path'
import { camelCase, constantCase, pascalCase } from 'string-fn'

import { outputFileSync } from '../_modules/outputFileSync'
import { textToJs } from '../_modules/textToJs'

/**
 * Create new epic files - index and starter
 */
export function createEpic(
  _: ComponentInput,
): ComponentCreatedEpic {

  const constantKey = constantCase(`${_.name}.${_.firstEpicStarter}`)
  const epic = camelCase(_.firstEpic)
  const action = pascalCase(`${constantKey}.action`)

  const epicContent = textToJs(
    resolve(__dirname, '../../templates/component/epic.txt'),
    [constantKey, epic, action],
  )
  outputFileSync(
    _.epicLocation,
    epicContent,
  )

  const exportedEpicName = camelCase(`${_.name}.epic`)
  const indexEpicContent = textToJs(
    resolve(__dirname, '../../templates/component/indexEpic.txt'),
    [epic, exportedEpicName],
  )
  
  outputFileSync(
    _.indexEpicLocation,
    indexEpicContent,
  )

  const x = camelCase(_.name)
  const y = constantCase(_.firstEpicStarter)
  const constantValue = `${x}@${y}`

  return {
    constantKey,
    constantValue,
  }
}
