import { getAllComponents } from '../_helpers/getAllComponents'
import { askInputTemplate } from '../_modules/askInputTemplate'
import { askListTemplate } from '../_modules/askListTemplate'
import { selectStarterAction } from './selectStarterAction'

// STEP_1
export const askFolder = async (input: DoModule) => {
  const components = await getAllComponents(input.srcDirectory)

  return askListTemplate({
    choices: components,
    key: 'folder',
    question: 'Location of new epic',
  })
}

// STEP_2
export const askName = async () => askInputTemplate({
  key: 'name',
  question: 'Name(DOTCASE)',
})

// STEP_3
export const askStarterActionType = async () => askListTemplate({
  choices: ['new', 'existing'],
  key: 'starterActionType',
  question: 'Start your epic with new or existing constant',
})

// OPTIONAL_STEP_4
export const askStarterAction = async () => askInputTemplate({
  key: 'starterAction',
  question: 'Action starting this epic(DOTCASE)',
})
