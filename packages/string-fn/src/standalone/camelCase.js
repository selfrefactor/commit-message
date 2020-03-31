const WORDS = /[A-Z]?[a-z]+|[A-Z]+(?![a-z])+/g

const capitalizeFirst = x => x.split('')
  .map(
    (char, i) => i === 0 ? char.toUpperCase() : char.toLowerCase()
  )
  .join('')

export function camelCase(input){
  const matched = input.match(WORDS)

  return matched
    .map((x, i) => i === 0 ? x.toLowerCase() : capitalizeFirst(x))
    .join('')
}
