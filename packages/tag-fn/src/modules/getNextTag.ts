import {
  add,
  adjust,
  always,
  compose,
  identity,
  ifElse,
  join,
  map,
  split,
} from 'rambdax'

export const getNextTag = (
  currentTag: string,
  tagType: TagType,
): string => {
  let [major, minor, patch]: Array<any> = compose(
    ifElse(
      (x: Array<string>) => x.length === 3,
      identity,
      () => {throw 'Only tags with pattern \'1.2.3\' are accepted'},
    ),
    split('.'),
  )(currentTag)

  let flag = false
  if (patch === '9' && tagType === 'patch'){
    if (minor === '9'){
      return `${Number(major) + 1}.0.0`
    }
    patch = 0
    minor = Number(minor) + 1
    flag = true
  }else if (minor === '9' && tagType === 'minor'){
    minor = 0
    major = Number(major) + 1
    flag = true
  }

  if (tagType === 'minor'){
    patch = 0
  }

  if (tagType === 'major'){
    patch = 0
    minor = 0
  }
  const tagIndex = tagType === 'patch' ? 2 : tagType === 'minor' ? 1 : 0

  const result: string = compose<any, any,any,any>(
    join('.'),
    ifElse(
      always(flag),
      identity,
      adjust(add(1), tagIndex),
    ),
    map(Number),
  )([major, minor, patch])

  return result
}
