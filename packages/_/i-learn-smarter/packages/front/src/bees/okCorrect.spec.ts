import { okCorrectBee } from './okCorrect'

test('okCorrectBee', () => {
  const state = {
    okCorrect: [null,null, null],
    index: 0
  }
  const expected = {
    okCorrect: [true,null, null],
    index: 0
  }
  const result = okCorrectBee(state, true)
  expect(result).toEqual(expected)
})

test('false as payload', () => {
  const state = {
    okCorrect: [null,null, null],
    index: 2
  }
  const expected = {
    okCorrect: [null, null, false],
    index: 2
  }
  const result = okCorrectBee(state, false)
  expect(result).toEqual(expected)
})
