import { head, init, last, tail } from 'rambdax'

import { count } from './count'

export function glob(str, globStr){
  const numGlobs = count(globStr, '*')

  if (numGlobs === 1){
    if (head(globStr) === '*'){
      return str.endsWith(tail(globStr))
    } else if (last(globStr) === '*'){
      return str.startsWith(init(globStr))
    }
  } else if (numGlobs === 2 && head(globStr) === '*' && last(globStr) === '*'){
    globStr = init(tail(globStr))
    const foundIndex = str.indexOf(globStr)

    return foundIndex > 0 && foundIndex + globStr.length < str.length
  }

  return false
}
