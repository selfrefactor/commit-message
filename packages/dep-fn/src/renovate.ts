import {readJson} from 'fs-extra'
import {existsSync} from 'fs'
import { tail } from 'rambdax'
import {log} from 'helpers-fn'
import {execCommand} from './modules/helpers/execCommand'

const HOW_MANY = 3

function betweenIndexes(list, from, to){
  return list.filter((_,i) => i >= from && i<= to)
}

export async function renovate(dependencyName){
  const filePath = `${process.cwd()}/package.json`
  
  if(!existsSync(filePath)){
    return log('Expected package.json', 'error')
  }
  const {devDependencies, dependencies} = await readJson(filePath)
  if(!dependencies[dependencyName] && !devDependencies[dependencyName]){
    return log(`No such dependency ${dependencyName}`, 'error')
  }
  const isDev = Boolean(devDependencies[dependencyName])

  const currentVersionRaw = isDev ? devDependencies[dependencyName] : dependencies[dependencyName]
  const currentVersion = Number.isNaN(currentVersionRaw[0]*1) ? tail(currentVersionRaw) : currentVersionRaw

  const command = `npm info --json ${dependencyName}`

  const packageInfo: string = await execCommand(command)
  const {versions} = JSON.parse(packageInfo)
  const foundIndex = versions.indexOf(currentVersion)
  const candidates = betweenIndexes(versions, foundIndex - HOW_MANY, foundIndex + HOW_MANY)
  console.log({versions, foundIndex, candidates, currentVersion})
}