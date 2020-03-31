import {
  length,
  split,
} from 'rambdax'

export function count(str, substr){
  return length(split(substr, str)) - 1
}
