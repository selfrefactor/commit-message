import {
  join,
  map,
  split,
} from 'rambdax'

export function removeIndent(str){
  return join(
    '\n',
    map(
      val => val.trimLeft(),
      split('\n', str)
    )
  )
}
