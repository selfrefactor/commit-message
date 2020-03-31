import { HTML_TAGS } from './internals/constants'
import { replace } from 'rambdax'

export function stripTags(str){
  return replace(
    /\s+/g,
    ' ',
    replace(
      HTML_TAGS,
      ' ',
      str
    )
  ).trim()
}
