import {UpdateDependencies} from '../../../typings'
import {confirm} from './confirm'
import {getFallBackLatest} from './getFallbackLatest'
import {getUpdateQuestion} from './getUpdateQuestion'
import {normalizeTag} from './normalizeTag'

export const getFallbackUpdate = async(
  input: UpdateDependencies
): Promise<string> => {
  try {
    const currentVersion = normalizeTag(input.tag)
    const latestVersion: string = await getFallBackLatest(input.dependency)

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
  } catch (error) {
    throw new Error(error)
  }
}
