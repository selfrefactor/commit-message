import { prompt } from 'inquirer'
import { PromptSelect } from '../typings'

export async function promptSelect(input: PromptSelect): Promise<string> {
  try {
    const result: any = await prompt([{
      choices: input.choices,
      message: input.question,
      name: 'answer',
      type: 'list',
    }])

    return result.answer
  } catch (err) {
    throw err
  }
}
