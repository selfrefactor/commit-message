import { createAction } from 'create-action'
import {
  SINGLE_INSERT_CREATE,
  SINGLE_INSERT_INPUT_CHANGE,
  SINGLE_INSERT_TRANSLATE_PART,
  SINGLE_INSERT_TRANSLATE_WORD,
} from '../constants'

export const create = createAction(SINGLE_INSERT_CREATE)
export const inputChange = createAction(SINGLE_INSERT_INPUT_CHANGE)
export const translatePart = createAction(SINGLE_INSERT_TRANSLATE_PART)
export const translateWord = createAction(SINGLE_INSERT_TRANSLATE_WORD)
