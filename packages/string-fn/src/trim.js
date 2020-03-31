import { replace } from 'rambdax'

export function trim(str){
  return replace(/\s+/g, ' ', str).trim()
}
