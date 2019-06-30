import { readJSONSync } from 'fs-extra'
import { last } from 'rambdax'
import { outputFileSync } from './outputFileSync'
import { stringify } from './stringify'

function getSrcFolder(srcDirectory: string) {

  return last(srcDirectory.split('/'))
}

/**
 * Update `scripts` property in `package.json`_
 * so it includes two `jest` commands_
 * one for running test_
 * the other for watch mode of `jest`
 */
export function updateScripts(filePath: string, rootInput: DoModule) {

  const packageJsonContent = readJSONSync(rootInput.packageJson)
  const packageJsonScripts = packageJsonContent.scripts
  /**
   * We receive here filepath without the `srcDirectory`
   */
  const [, normalizedFilePathRaw] = filePath.split(rootInput.srcDirectory)

  /**
   * We need to know what is the last folder_
   * from the `srcDirectory` path so we can append it_
   * to the final filepath.
   */
  const srcFolder = getSrcFolder(rootInput.srcDirectory)

  const normalizedFilePath = `${srcFolder}${normalizedFilePathRaw}`

  /**
   * `x` append to `dev` suggests that this command_
   * has something extra - in this case a watch flag
   */
  const scripts = {
    ...packageJsonScripts,
    dev: `jest ${normalizedFilePath}`,
    devx: `jest ${normalizedFilePath} --watch`,
  }

  const newPackageJson = {
    ...packageJsonContent,
    scripts,
  }

  outputFileSync(rootInput.packageJson, stringify(newPackageJson))
}