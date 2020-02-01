import { prompt } from 'inquirer'
import { callSpecificMode } from './_modules/callSpecificMode'
import { nodeTypes, reactTypes } from './_modules/types'
export { check } from './check'

export async function doModule(rootInput: DoModule): Promise<any> {
  try {
    const thisTypes = rootInput.mode === 'NODE' ?
      nodeTypes :
      reactTypes

    const { selectedMode } = await prompt([{
      choices: Object.values(thisTypes),
      message: 'Select option',
      name: 'selectedMode',
      type: 'list',
    }])

    return callSpecificMode(selectedMode, rootInput)
  } catch (e) {
    console.log(e)
  }
}
