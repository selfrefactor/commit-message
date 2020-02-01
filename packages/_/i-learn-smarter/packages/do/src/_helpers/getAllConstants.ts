import { readFileSync } from 'fs'
import { init, match, replace } from 'rambdax'

export function getAllConstants(filePath: string) {
  const fileContent = readFileSync(filePath).toString()
  const matched = match(/export\sconst\s.{2,30}=/gmu, fileContent)

  return matched.map(singleMatch => {
    const replaced = replace(
      'export const',
      '',
      singleMatch,
    )

    return init(replaced).trim()
  })
}
