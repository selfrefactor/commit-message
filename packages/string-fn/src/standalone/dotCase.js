const WORDS = /[A-Z]?[a-z]+|[A-Z]+(?![a-z])+/g

export function dotCase(input){
  return input
    .match(WORDS)
    .map(x => x.toLowerCase())
    .join('.')
}
