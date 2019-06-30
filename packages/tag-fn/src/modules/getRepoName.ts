import { existsSync } from 'fs'
import { resolve, sep } from 'path'
import {
  last,
  replace,
  split,
} from 'rambdax'

const getPath = (): false|string => {
  if (existsSync(resolve(process.cwd(), '.git/HEAD'))){
    return process.cwd()
  }

  let flag: false|string = false

  Array(4)
    .fill('')
    .map((_, i) => {
      if (flag === false) {
        const filePath = resolve(
          process.cwd(),
          `${'../'.repeat(i)}/.git/HEAD`,
        )

        if (existsSync(filePath)) {
          flag = replace('/.git/HEAD', '', filePath)
        }
      }
    })

  return flag
}

export const getRepoName = (): string => {

  const projectPath = getPath()
  if (projectPath === false){
    throw 'You are not inside a Github project folder!'
  }

  return last(split(sep, projectPath))
}
