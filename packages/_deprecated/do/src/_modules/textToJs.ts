import { readFileSync } from 'fs'
import { replace, take } from 'rambdax'

const regexListRaw = [
  /\$\{0\}/gm,
  /\$\{1\}/gm,
  /\$\{2\}/gm,
  /\$\{3\}/gm,
  /\$\{4\}/gm,
  /\$\{5\}/gm,
]

export function textToJs(filePath: string, replacers: string[]) {
  let fileContent = readFileSync(filePath).toString()
  const regexList = take(replacers.length, regexListRaw)

  regexList.forEach((singleRegex, index) => {
    fileContent = replace(
      singleRegex,
      replacers[index],
      fileContent,
    )
  })

  return fileContent
}
