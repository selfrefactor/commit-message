import {
  askFolder,
  askName,
  askStarterAction,
} from './../_ask/epic'

import { dotCase } from 'string-fn'
import { askStarterActionType } from '../_ask/epic'
import { selectStarterAction } from '../_ask/selectStarterAction'

export async function askUser(input: DoModule): Promise<EpicAskUser> {
  const folder = await askFolder(input)
  const name = await askName()
  const starterActionType = await askStarterActionType()

  const isNew = starterActionType === 'NEW'
  const starterActionRaw = isNew ?
    await askStarterAction() :
    await selectStarterAction(input)

  const starterAction = isNew ?
    `${dotCase(folder)}.${starterActionRaw}` :
    starterActionRaw
    
  return {
    folder,
    name,
    starterAction,
  }
}
