// tslint:disable
import { log } from 'helpers'
import { type } from 'rambdax'
import * as prompts from 'prompts'
import { normalize, normalizeTestInput } from './_helpers/normalizeTestInput'
import { askInputTemplate } from './_modules/askInputTemplate'
import { getAllConstants } from './_helpers/getAllConstants'
import { dotCase } from 'string-fn';

const isRootConstant = {
  type: 'toggle',
  name: 'isRoot',
  message: 'Does it belong to `root` namespace',
  initial: false,
  active: 'no',
  inactive: 'yes'
}

export async function fn(): Promise<any> {
  try {
    const allConstants = getAllConstants('/home/just/repos/do/demoReact/constants.ts')

    const choices = allConstants.map(x => ({
      title: dotCase(x)
    }))
    const question = {
      type: 'autocomplete',
      name: 'answer',
      message: 'Pick your favorite actor',
      choices
    }
    const { answer } = await prompts([question])
    const { isRoot } = await prompts([isRootConstant])

    /**
     * Prompts library return inverted answer
     */
    return isRoot ?
      answer :
      `root.${answer}`
  } catch (err) {
    throw err
  }
}

fn()
  .then(console.log)
  .catch(console.log)
// askInputTemplate({
//   key: 'test',
//   question: 'Test input',
// }).then(answer => {
//   const normalized = normalize(answer)
//   const normalizedTestInput = normalizeTestInput(answer)
//   const len = [normalized.length, normalizedTestInput.length]

//   log({
//     normalized,
//     normalizedTestInput,
//     len,
//   }, 'patternx')
// })

  // tslint:enable
