import {
  getEpicInput,
  getEpicInputWhenOuter,
} from '../_helpers/testInputHolder'
import { epic } from './'
import { editActions } from './editActions'

test('', () => {
  const result = editActions(getEpicInput())
  console.log(result)
})

test('', () => {
  const result = editActions(getEpicInputWhenOuter())
  console.log(result)
})
