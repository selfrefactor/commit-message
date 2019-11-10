import { flatten, uniq,sort } from 'rambdax'
import { comparator } from '../_modules/comparator'
export function normalize(word: string, synonyms: string[]): string[]{
  const normalized = flatten<string>(synonyms.map(
    singleSynonym => singleSynonym.split(', ').filter(
      x => !x.toLowerCase().includes(word)
    )
  ))

  return uniq(
    sort(comparator,normalized)
  )
} 