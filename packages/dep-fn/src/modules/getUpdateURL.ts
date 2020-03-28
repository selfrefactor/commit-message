import {head} from 'rambdax'

export function getUpdateURL(x: string) {
  return head(x.split('#'))
}
