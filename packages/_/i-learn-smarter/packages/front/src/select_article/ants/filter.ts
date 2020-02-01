import { flip, has, includes, switcher, toLower } from 'rambdax'
const includesx = flip(includes)

import { wordsX } from 'string-fn'

const dem = [
  'das',
  'dem',
  'den',
  'der',
  'des',
  'die',
]
const als = [
  'als',
  'ob',
  'obwohl',
  'trotzdem',
  'weil',
  'wenn',
]
const einem = [
  'ein',
  'eine',
  'einem',
  'einen',
  'einer',
  'eines',
]
const meinem = [
  'mein',
  'meine',
  'meinem',
  'meinen',
  'meiner',
  'meines',
]
const deinem = [
  'dein',
  'deine',
  'deinem',
  'deinen',
  'deiner',
  'deines',
]
const seinem = [
  'sein',
  'seine',
  'seinem',
  'seinen',
  'seiner',
  'seines',
]
const ihrem = [
  'ihr',
  'ihre',
  'ihrem',
  'ihren',
  'ihrer',
  'ihres',
]
const unserem = [
  'unser',
  'unsere',
  'unserem',
  'unseren',
  'unserer',
  'unseres',
]
const eurem = [
  'euer',
  'eurem',
  'euren',
  'eurer',
  'eurere',
  'eures',
]

export function whichArticleSet(word: string): string[]{

  return switcher<string[]>(word)
    .is(includesx(dem), dem)
    .is(includesx(deinem), deinem)
    .is(includesx(einem), einem)
    .is(includesx(ihrem), ihrem)
    .is(includesx(meinem), meinem)
    .is(includesx(seinem), seinem)
    .is(includesx(unserem), unserem)
    .is(includesx(eurem), eurem)
    .default(als)
}

export const allArticles: string[] = [
  ...dem,
  ...einem,
  ...meinem,
  ...deinem,
  ...seinem,
  ...ihrem,
  ...unserem,
  ...eurem,
  ...als,
]

function count(sentence: string): number{
  const words = wordsX(sentence).map(toLower)

  return words.reduce((prev, current) => {

    return allArticles.includes(current) ?
      prev + 1 :
      prev
  }, 0)
}

export function filterAnt(db: DBInstance[]): any {
  const hasDePart = db.filter(
    has('dePart'),
  )

  const filtered = hasDePart.filter(
    x => count(x.dePart) > 1,
  )

  return filtered
}
