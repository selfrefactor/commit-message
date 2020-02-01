import { log } from 'log'
import { camelCase, snakeCase } from 'string-fn'
import { askUser } from './askUser'

import { getAllComponents } from '../_helpers/getAllComponents'
import { connectEpic } from './connectEpic'
import { createEpic } from './createEpic'
import { editActions } from './editActions'
import { editConstants } from './editConstants'
import { editTypings } from './editTypings'

/**
 * Creates new epic within selected folder that expects specific action
 */
export async function epic(rootInput: DoModule): Promise<void> {
  try {
    var asked = await askUser(rootInput)
    const allComponents = await getAllComponents(rootInput.srcDirectory)

    const folderName = snakeCase(asked.folder)
    const dir = `${rootInput.srcDirectory}/${folderName}`

    /**
     * On purpose repeat those declarations
     * anti-DRY principle
     */
    const actionsLocation = `${dir}/actions.ts`
    const constantsLocation = `${rootInput.srcDirectory}/constants.ts`
    const epicLocation = `${dir}/epics/${camelCase(asked.name)}.ts`
    const indexEpicLocation = `${dir}/epics/index.ts`
    const typingsLocation = `${rootInput.srcDirectory}/typings.d.ts`

    var basicInput = {
      ...asked,
      actionsLocation,
      allComponents,
      constantsLocation,
      epicLocation,
      indexEpicLocation,
      rootInput,
      typingsLocation,
    }
    const createdEpic = createEpic(basicInput)
    var input = {
      ...basicInput,
      ...createdEpic,
    }

    editTypings(input)
    editActions(input)
    editConstants(input)
    connectEpic(input)

    if (process.env.NODE_ENV === 'test') {
      log(input, 'obj')
    }else{
      log('', 'success')
    }
  } catch (e) {
    console.log(e)
    console.log(asked, 'asked')
    console.log(input, 'input')
  }
}
