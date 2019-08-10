import { prompt } from 'inquirer'
import { normalizeInput } from '../_helpers/normalizeInput'

export async function askTestInput(input: any): Promise<any> {
  if (input === '') {

    return undefined
  }
  const inputList = input.split(',')
  const willReturn = {}

  for (const singleInput of inputList) {
    const { singleAnswer } = await prompt([{
      message: `Test input for argument '${singleInput}'`,
      name: 'singleAnswer',
      type: 'input',
    }])
    willReturn[singleInput] = normalizeInput(singleAnswer)
  }

  return willReturn
}
