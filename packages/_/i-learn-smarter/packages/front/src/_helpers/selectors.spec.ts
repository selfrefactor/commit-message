import { getCommons } from './selectors'
import {sampleState} from '../../files/_helpers/sampleState'

const store = {
  getState: () => sampleState
}

test('get commons', () => {
  const result = getCommons(store)
  const expected = { fromLanguage: 'DE',
    name: 'writeSentence',
    randomFlag: true,
    textToSpeechFlag: true,
    toLanguage: 'EN' 
  }
  expect(
    result
  ).toEqual(expected)
})