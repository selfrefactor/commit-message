import {typesOfCommit, ALL_LABELS} from './constants'
import * as FuzzySet from 'fuzzyset'
import { tap } from 'rambda'
const FUZZY_LIMIT = 0.3

function applySearch(
  fuzzyInstance: any,
  defaultValue: string,
  searchString: string
) {
  const fuzzyResult = fuzzyInstance
    .get(searchString)
    .filter(([score]) => score > FUZZY_LIMIT)
    // .map(tap(console.log))
    .map(([, x]) => x)
  if (fuzzyResult.length === 0) return defaultValue

  return fuzzyResult[0]
}

export async function commitMessageFast(
  input: CommitMessage
): Promise<string> {
  const allModes = typesOfCommit.map(x => x.value)
  const allTags = ALL_LABELS.map(x =>
    x.includes(' ') ? x.split(' ')[1] : x
  )

  const commitMode = applySearch(
    FuzzySet(allModes, false, 1, 2),
    allModes[0],
    input.commitMode
  )

  const commitTag = input.commitTag
    ? applySearch(
      FuzzySet(allTags, false, 1, 2),
      '',
      input.commitTag
    )
    : ''

  if (!commitTag) {
    return `${commitMode}: ${input.commitMessage}`
  }

  return `${commitMode}@${commitTag} ${input.commitMessage}`
}
