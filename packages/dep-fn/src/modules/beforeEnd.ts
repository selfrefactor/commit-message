import { existsSync, unlinkSync } from 'fs'
import { writeFileSync } from 'fs-extra'
import * as jsonFormat from 'json-format'
import { log } from 'helpers'
import { join } from 'path'
import { merge } from 'rambdax'
import { Dependencies } from '../../typings'

export const beforeEnd = async (input: Dependencies): Promise<void> => {

  const filePath = join(process.cwd(), 'package.json')
  const lockFilePath = join(process.cwd(), 'yarn.lock')

  unlinkSync(filePath)

  if (existsSync(lockFilePath)) {
    unlinkSync(lockFilePath)
  }

  const newProps = {
    dependencies: input.dependencies,
    devDependencies: input.devDependencies,
  }

  const newPackageJson = merge(
    input.packageJson,
    newProps,
  )

  writeFileSync(filePath, jsonFormat(newPackageJson))

  log('', 'info')
}
