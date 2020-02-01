import { log } from 'log'
import { camelCase, pascalCase, snakeCase } from 'string-fn'

import { askUser } from './askUser'

import { createActions } from './createActions'
import { createComponent } from './createComponent'
import { createEpic } from './createEpic'
import { createReducers } from './createReducers'

import { editCombinedReducers } from './editCombinedReducers'
import { editConstants } from './editConstants'
import { editIndexTsx } from './editIndexTsx'
import { editRootEpic } from './editRootEpic'
import { editTypings } from './editTypings'

export async function component(rootInput: DoModule): Promise<void> {
  try {

    var asked = await askUser()

    const folderName = snakeCase(asked.name)
    const dir = `${rootInput.srcDirectory}/${folderName}`
    const root = `${rootInput.srcDirectory}/root`

    const storeName = camelCase(`${asked.name}.store`)
    const storeTyping = pascalCase(`${asked.name}.store`)

    const actionsLocation = `${dir}/actions.ts`
    const combinedReducersLocation = `${root}/combinedReducers.ts`
    const componentLocation = `${dir}/component.tsx`

    const constantsLocation = `${rootInput.srcDirectory}/constants.ts`
    const epicLocation = `${dir}/epics/${camelCase(asked.firstEpic)}.ts`

    const indexEpicLocation = `${dir}/epics/index.ts`
    const indexTsxLocation = `${rootInput.srcDirectory}/index.tsx`
    const reducersLocation = `${dir}/reducers.ts`

    const rootEpicLocation = `${root}/epics/index.ts`
    const typingsLocation = `${rootInput.srcDirectory}/typings.d.ts`

    var input = {
      ...asked,
      actionsLocation,
      combinedReducersLocation,
      componentLocation,
      constantsLocation,
      epicLocation,
      folderName,
      indexEpicLocation,
      indexTsxLocation,
      reducersLocation,
      rootEpicLocation,
      rootInput,
      storeName,
      storeTyping,
      typingsLocation,
    }

    const createdEpic = createEpic(input)
    var extendedInput = {
      ...input,
      ...createdEpic,
    }

    createReducers(input)
    createActions(extendedInput)
    createComponent(extendedInput)
    editTypings(extendedInput)
    editRootEpic(extendedInput)
    editConstants(extendedInput)
    editCombinedReducers(extendedInput)
    editIndexTsx(input)

    if (process.env.NODE_ENV === 'test') {
      log(extendedInput, 'obj')
    }else{
      log('', 'success')
    }
  } catch (e) {
    console.log(e)
    console.log(asked, 'asked')
    console.log(input, 'input')
    console.log(extendedInput, 'extendedInput')
  }
}
