import * as prompts from 'prompts'
import { sort } from 'rambdax'
import { dotCase } from 'string-fn'
import { getAllConstants } from '../_helpers/getAllConstants'
import { sortByProp } from '../_helpers/sorter'

export async function selectStarterAction(input: DoModule): Promise<string> {
  try {
    const location = `${input.srcDirectory}/constants.ts`
    const allConstants = getAllConstants(location)

    const choicesRaw = allConstants.map(_ => ({ title: dotCase(_)}))
    const choices = sort(sortByProp('title'), choicesRaw)

    const question = {
      choices,
      message: 'Pick your starter action(DOTCASE)',
      name: 'answer',
      limit: 30,
      type: 'autocomplete',
    }

    const { answer } = await prompts([question])
    console.log(answer)

    return answer
  } catch (err) {
    throw err
  }
}
