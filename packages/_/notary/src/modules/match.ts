import {
  match as matchModule,
  replace,
  isNil,
} from 'rambdax'
import { constantCase} from 'string-fn'
import * as Constants from '../constants'

export function match(
  text: string, 
  label: string, 
  fn?: ReturnString
): string {
  const baseKey = constantCase(label)
  const regexKey = `${baseKey}_REGEX`
  const removeKey = `${baseKey}_REMOVE`

  const regex = Constants[regexKey]
  const remove = Constants[removeKey]
  
  if(isNil(regex) || isNil(remove)){
    throw `${baseKey}_MISSING_CONSTANTS`
  }

  const [matched] = matchModule(regex, text)
  
  if (matched === undefined) {
    throw baseKey
  }

  const replaced = replace(
    remove,
    '',
    matched,
  ).trim()

  return isNil(fn) ?
    replaced :
    fn(replaced)
}

export function matchTwoSteps(text: string, label: string, fn?: ReturnString): string {
  const baseKey = constantCase(label)
  const regexKey = `${baseKey}_REGEX`
  const removeFirstKey = `${baseKey}_REMOVE_FIRST`
  const removeSecondKey = `${baseKey}_REMOVE_SECOND`

  const regex = Constants[regexKey]
  const removeFirst = Constants[removeFirstKey]
  const removeSecond = Constants[removeSecondKey]
  
  if(isNil(regex) || isNil(removeFirst) || isNil(removeSecond)){
    throw `${baseKey}_MISSING_CONSTANTS`
  }

  const [matched] = matchModule(regex, text)
  
  if (matched === undefined) {
    throw baseKey
  }

  const afterFirstRemove = replace(
    removeFirst,
    '',
    matched,
  ).trim()

  const replaced = replace(
    removeSecond,
    '',
    afterFirstRemove,
  ).trim()

  return isNil(fn) ?
    replaced :
    fn(replaced)
}

export function matchx(input: Match): string {
  const [result] = matchModule(input.regex, input.text)
  
  if (result === undefined) {
    throw input.label.toUpperCase()
  }

  return replace(
    input.regexRemove,
    '',
    result,
  ).trim()
}

export function matchTwoStepsx(input: MatchTwoSteps): string {
  const [result] = matchModule(input.regex, input.text)
  
  if (result === undefined) {
    throw input.label.toUpperCase()
  }

  const afterFirstRemove = replace(
    input.regexFirstRemove,
    '',
    result,
  ).trim()

  return replace(
    input.regexSecondRemove,
    '',
    afterFirstRemove,
  ).trim()
}
