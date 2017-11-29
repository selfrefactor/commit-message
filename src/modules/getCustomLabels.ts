import { existsSync, readFileSync } from 'fs'
import { join, resolve } from 'path'
import { CustomLabel } from '../typings'

const getPath = (): false | string => {
  let flag = true
  let willReturn

  const basePath = process.cwd()

  Array(4).fill('')
    .map((_, i) => {
      if (flag) {
        const filePath = resolve(basePath, `${'../'.repeat(i)}/package.json`)

        if (existsSync(filePath)) {
          flag = false
          willReturn = filePath
        }
      }
    })

  return willReturn
}

export function getCustomLabels(): false | CustomLabel {
  const filePathRaw = join(process.cwd(), 'package.json')
  const initCheck = existsSync(filePathRaw)

  const filePath = initCheck ?
    filePathRaw :
    getPath()

  if (filePath === false) {
    return false
  }

  const packageJsonRaw = readFileSync(filePath).toString()

  const packageJson = JSON.parse(packageJsonRaw)

  return packageJson.commitMessage === undefined ?
    false :
    packageJson.commitMessage
}
