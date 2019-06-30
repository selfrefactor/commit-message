import { last, match, split } from 'rambdax'
import { UpdateDependencies } from '../../typings'

import { getUpdateTag } from './getUpdateTag'
import { confirm } from './helpers/confirm'
import { getUpdateQuestion } from './helpers/getUpdateQuestion'

export const getUpdateDependency = async (
  input: UpdateDependencies,
): Promise<string> => {
  const latestTagRaw: false | string = await getUpdateTag(input)
  const currentTag: string = last(
    split('#', input.tag),
  )

  if (latestTagRaw === false) {
    throw `Couldn't fetch latest tag ${input.dependency} ${input.tag}`
  }

  const latestTag: string = match(
    /[0-9\.]/g,
    latestTagRaw as string,
  ).join('')

  if (currentTag === latestTag) {

    return input.tag
  }

  const question = getUpdateQuestion({
    currentTag,
    dependency: input.dependency,
    latestTag: latestTag as string,
  })

  const answer = await confirm(question, input.dependency)

  return answer ? `${input.url}#${latestTag}` : input.tag
}
