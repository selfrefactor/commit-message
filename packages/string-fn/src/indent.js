import {
  join,
  map,
  split,
} from 'rambdax'

export function indent(str, indentCount){
  return join(
    '\n',
    map(
      val => `${ ' '.repeat(indentCount) }${ val }`,
      split('\n', str)
    )
  )
}
