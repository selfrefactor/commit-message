import {typesOfCommit, ALL_LABELS} from './constants'
import * as FuzzySet from 'fuzzyset'
const FUZZY_LIMIT = 0.3
const FUZZY_CONSERVATIVE_LIMIT = 0.5

function applySearch(fuzzyInstance: any, fuzzyConservativeInstance: any, defaultValue: string,  searchString: string) {
  const fuzzyResult = fuzzyInstance
    .get(searchString)
    .filter(([score]) => score > FUZZY_LIMIT)
    .map(([, x]) => x)
  const fuzzyResultConservative = fuzzyConservativeInstance
    .get(searchString)
    .filter(([score]) => score > FUZZY_CONSERVATIVE_LIMIT)

  const diff = fuzzyResult.length - fuzzyResultConservative.length
  if (diff > 2 && fuzzyResultConservative.length === 0) return defaultValue
  if (fuzzyResult.length === 0) return defaultValue
  if (diff > 2) return fuzzyResultConservative[0]

  return fuzzyResult[0]
}

export async function commitMessageFast(
  input: CommitMessage
  ): Promise<string> {
    const allModes = typesOfCommit.map(
      x => x.value
      )
    const allTags = ALL_LABELS.map(
      x => x.includes(' ') ? x.split(' ')[1]: x
    )

      const commitMode = applySearch(
        FuzzySet(allModes, false, 1, 2),
        FuzzySet(allModes, true, 2, 3),
        allModes[0],
        input.commitMode
      )

      const commitTag = input.commitTag ? applySearch(
        FuzzySet(allTags, false, 1, 2),
        FuzzySet(allTags, true, 2, 3),
        allTags[0],
        input.commitTag
      ) : ''

  if(!commitTag){
    return `${commitMode}: ${input.commitMessage}`
  }    
  
  return `${commitMode}@${commitTag} ${input.commitMessage}`
}
