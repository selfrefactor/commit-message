import {prompt} from 'inquirer'

export async function promptSelect(input: PromptSelect): Promise<string> {
  const defaultIndex = input.choices.indexOf(input.default)

  const {answer} = await prompt([
    {
      type: 'list',
      name: 'answer',
      message: input.question,
      choices: input.choices,
      default: defaultIndex === -1 ? 0 : defaultIndex,
    },
  ])
  return answer
}
