import { log } from 'helpers'
import { merge } from 'rambdax'
import {
  GetInfo,
  GithubTag,
} from '../../typings'
import { getInitTag } from './getInitTag'
import { getInitURL } from './getInitURL'

export const getInitDependency = async (input: GetInfo): Promise<string> => {
  const repositoryURL: string = await getInitURL(input.dependency)
  const options: GithubTag = merge(input, { url: repositoryURL })

  const currentTag: false | string = await getInitTag(options)

  if (currentTag === false) {
    log(`Package '${input.dependency}' doesn't have Github tags!`, 'warning')
  } else {
    log(input.dependency, 'success')
  }

  // if currentTag is false, that means that the NPM package
  // doesn't have Github tags and we need to fallback to
  // the previous value

  return currentTag === false ?
    `^${input.tag}` :
    `${repositoryURL}#${currentTag}`
}
