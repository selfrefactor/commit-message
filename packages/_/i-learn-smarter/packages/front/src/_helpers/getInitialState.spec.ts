import { getInitialState } from './getInitialState'
import { ok,pass } from 'rambdax'

test('happy', () => {
  expect(
    pass(getInitialState())('object')
  ).toBe(true)
})

const schema = {
  fromLanguage: ['DE','EN','BG'],
  instructions: 'string',
  logged: 'boolean',
  name: 'string',
  points: 'number',
  ready: 'boolean',
  roughData: 'object',
  textToSpeechFlag: 'boolean',
  toLanguage: ['DE','EN','BG'],
  toggleLanguage: 'boolean',
}

test('with schema', () => {
  expect(
    () => ok(getInitialState())(schema)
  ).not.toThrow()
})
