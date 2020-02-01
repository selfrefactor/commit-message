import { constantCase, pascalCase } from 'string-fn'

export function generateChoices(choices: string[]) {
  return choices.map(singleChoice => ({
    name: pascalCase(singleChoice),
    value: constantCase(singleChoice),
  }))
}
