const WORDS = /[A-Z]?[a-z]+|[A-Z]+(?![a-z])+/g

const capitalizeFirst = x => x.split('')
  .map(
    (char, i) => i === 0 ? char.toUpperCase() : char.toLowerCase()
  )
  .join('')

export function pascalCase(input){
  const matched = input.match(WORDS)

  return matched
    .map(capitalizeFirst)
    .join('')
}
