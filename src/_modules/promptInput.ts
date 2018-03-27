import { prompt } from 'inquirer'

export async function promptInput(question: string): Promise<string> {
  try {
    const result: any = await prompt([{
      message: question,
      name: 'answer',
      type: 'input',
    }])

    return result.answer
  } catch (err) {
    throw err
  }
}
