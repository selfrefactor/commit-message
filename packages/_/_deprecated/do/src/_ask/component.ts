import { askInputTemplate } from '../_modules/askInputTemplate'
import { askListTemplate } from '../_modules/askListTemplate'

// STEP_1
export const askComponentName = async () => askInputTemplate({
  key: 'componentName',
  question: 'Name of your component(DOTCASE)',
})

// STEP_2
export const askComponentFirstEpic = async () => askInputTemplate({
  key: 'componentFirstEpic',
  question: 'Pick an epic name(DOTCASE)',
})

// OPTIONAL_STEP_3
export const askFirstEpicStarter = async () => askInputTemplate({
  info: `Name local action that triggers the first epic
Note that you can refer only to FOO namespace and 
you don't need to write the namespace, i.e. 'init' instead of 'foo.init'`,
  key: 'componentFirstEpicStarter',
  question: 'Which action will ignite your epic(DOTCASE)',
})

// STEP_4
export const askComponentStoreType = async () => askListTemplate({
  choices: ['own.store', 'root.store', 'both'],
  key: 'componentStoreType',
  question: 'Select type of component\'s store',
})

// OPTIONAL_STEP_5
// PART_1
export const askStoreLoopStart = async () => askListTemplate({
  choices: ['add.prop', 'add.optional.prop', 'done'],
  key: 'loopStart',
  question: 'Add interface\'s (optional)property or you are ready',
})

// OPTIONAL_PART_2
export const askStorePropName = async () => askInputTemplate({
  key: 'propName',
  question: 'Property name(DOTCASE)',
})

// OPTIONAL_PART_3
export const askStorePropTyping = async () => askInputTemplate({
  info: 'You can use shorten versions: bool, num, obj, str',
  key: 'propTyping',
  question: 'Property definition',
})

// OPTIONAL_PART_4
// normalize input
export const askStorePropInitial = async () => askInputTemplate({
  info: 'Input will be normalized from string to other types',
  key: 'propInitial',
  question: 'Initial state of this property',
})
