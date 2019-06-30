import { existsSync } from 'fs'
import { readJsonSync } from 'fs-extra'
import { join } from 'path'
import { defaultTo } from 'rambdax'
import { Dependencies, StringMap } from '../../../typings'

export const getDependencies = async (): Promise<Dependencies> => {
  const filePath = join(process.cwd(), 'package.json')

  if (!existsSync(filePath)) {
    throw `filePath ${filePath} doesn't exists`
  }

  const packageJson = readJsonSync(filePath)

  const dependencies: StringMap<string> = defaultTo(
    {},
    packageJson.dependencies,
  )

  const devDependencies: StringMap<string> = defaultTo(
    {},
    packageJson.devDependencies,
  )

  const peerDependencies: StringMap<string> = defaultTo(
    {},
    packageJson.peerDependencies,
  )

  return {
    dependencies,
    devDependencies,
    packageJson,
    peerDependencies,
  }
}
