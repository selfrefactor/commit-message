import {readJson, outputJson} from 'fs-extra'
import {existsSync} from 'fs'
import {tail, takeLast, uniq, flatten} from 'rambdax'
import {prompt, Separator} from 'inquirer'
import {log} from 'helpers-fn'
import {execCommand} from './modules/helpers/execCommand'

const HOW_MANY = 3

function betweenIndexes(list, from, to, ignore) {
  return list.filter((_, i) => {
    if (i === ignore) return false

    return i >= from && i <= to
  })
}

export async function renovate(dependencyName) {
  const filePath = `${process.cwd()}/package.json`

  if (!existsSync(filePath)) {
    return log('Expected package.json', 'error')
  }
  const packageJson = await readJson(filePath)
  const {devDependencies, dependencies} = packageJson
  if (!dependencies[dependencyName] && !devDependencies[dependencyName]) {
    return log(`No such dependency ${dependencyName}`, 'error')
  }
  const isDev = Boolean(devDependencies[dependencyName])

  const currentVersionRaw = isDev
    ? devDependencies[dependencyName]
    : dependencies[dependencyName]
  const currentVersion = Number.isNaN(currentVersionRaw[0] * 1)
    ? tail(currentVersionRaw)
    : currentVersionRaw

  const command = `npm info --json ${dependencyName}`

  const packageInfo: string = await execCommand(command)
  const {versions} = JSON.parse(packageInfo)
  const foundIndex = versions.indexOf(currentVersion)
  const latest = takeLast(HOW_MANY, versions)
  const middle = betweenIndexes(
    versions,
    foundIndex - HOW_MANY,
    foundIndex + HOW_MANY,
    foundIndex
  )
  const candidates = uniq([...latest, ...middle])
    .sort()
    .map((x, i) => {
      if (i % HOW_MANY === 0) return [x, new Separator()]
      return x
    })

  const {answer} = await prompt([
    {
      type: 'list',
      name: 'answer',
      message: `Current version - ${currentVersion}`,
      choices: flatten(candidates),
      default: 0,
    },
  ])
  const depType = isDev ? 'devDependencies' : 'dependencies'
  const targetDependencies = isDev ? devDependencies : dependencies

  const toMerge = {
    ...targetDependencies,
    [dependencyName]: answer,
  }

  const toSave = {
    ...packageJson,
    [depType]: toMerge,
  }

  await outputJson(filePath, toSave, {spaces: 2})
}
