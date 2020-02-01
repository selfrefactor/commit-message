const nextList = [
  'nächste',
  'tschüss',
  'next',
  'следващ',
]

export function isNext(spoken){
  return nextList.includes(spoken)
}
