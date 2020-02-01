import {
  askComponentFirstEpic,
  askComponentName,
  askComponentStoreType,
  askFirstEpicStarter,
} from './../_ask/component'
import { askStore } from './askStore'

export async function askUser(): Promise<ComponentAskUser> {
  const name = await askComponentName()
  const firstEpic = await askComponentFirstEpic()
  const firstEpicStarter = await askFirstEpicStarter()

  const storeType = await askComponentStoreType()

  /**
   * Use `undefined` instead of false to bypass Typescript warning
   */
  const store: any = storeType === 'ROOT_STORE' ?
    undefined :
    await askStore()

  return {
    firstEpic,
    firstEpicStarter,
    name,
    store,
    storeType,
  }
}
