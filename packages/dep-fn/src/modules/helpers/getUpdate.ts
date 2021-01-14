import {GetInfo} from '../../../typings'
import {confirm} from './confirm'
import {getLatest} from './getLatest'
import {getUpdateQuestion} from './getUpdateQuestion'
import {normalizeTag} from './normalizeTag'

export const getUpdate = async(input: GetInfo): Promise<string> => {
  const currentVersion = normalizeTag(input.tag)
  const latestVersion: string = await getLatest(input.dependency)

  if (currentVersion === latestVersion) {
    return currentVersion
  }

  const question: string = getUpdateQuestion({
    currentTag: currentVersion,
    dependency: input.dependency,
    latestTag: latestVersion,
  })
  const answer = await confirm(question)

  const willReturn = answer ? latestVersion : currentVersion

  return willReturn
}
