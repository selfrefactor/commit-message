import { prompt } from 'inquirer'
import { normalizeInput } from '../_helpers/normalizeInput'

export async function askExpectedResult() {
  const { expectedResult } = await prompt([{
    message: 'Expected test result',
    name: 'expectedResult',
    type: 'input',
  }])

  return normalizeInput(expectedResult)
}
