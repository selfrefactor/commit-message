import { sort, uniq, pluck } from 'rambdax'
import { comparator } from '../_modules/comparator'

export function parse(word: string, input: any): string[]{
  if(input.synsets === undefined){
    return []
  }
  
  const synonyms = []
  input.synsets.forEach(singleSet => {
    const toPush = pluck<string>('term', singleSet.terms)
      .filter(singleSynonym => !singleSynonym.toLowerCase().includes(word))
    synonyms.push(...toPush)
  });

  return sort(
    comparator,
    uniq<string>(synonyms)
  )
}
