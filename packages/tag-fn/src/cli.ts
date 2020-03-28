import {log} from 'helpers-fn'
import {drop, defaultTo} from 'rambdax'
import {setGithubTag} from './setGithubTag'
import {setCredentials} from './helpers/setCredentials'

const allPossibleTags = ['minor', 'major', 'patch']

export async function cli(debugInput?: string) {
  const [cliInput] = drop(3, process.argv)
  const input = debugInput ? debugInput : cliInput
  if (input === 'init') return setCredentials()

  const tag = defaultTo('patch', input)

  if (allPossibleTags.includes(tag)) {
    log(`${tag} incrementation of the latest tag will be applied\n`, 'info')
  } else {
    log(`The new tag will be '${tag}'\n`, 'info')
  }

  log('spin')

  await setGithubTag(tag)
  log('stopspin')
}
