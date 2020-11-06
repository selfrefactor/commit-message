import {
  join,
  map,
  piped,
  split,
} from 'rambdax'

export function indentRight(str, indentCount){
  return piped(
    str,
    split('\n'),
    map(
      x => `${ x }${ ' '.repeat(indentCount) }`,
    ),
    join('\n')
  )
}
