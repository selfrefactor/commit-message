import { prompt } from 'inquirer'
import { PromptSelect } from '../index.d'

export async function promptSelect(input: PromptSelect): Promise<string> {
  try {
    const { answer } = await prompt([{
      choices: input.choices,
      message: input.question,
      name: 'answer',
      type: 'list',
    }])

    return answer
  } catch (err) {
    throw err
  }
}
