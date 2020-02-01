import { parseUrlInputsBee } from './parseUrlInputs'

test('happy', () => {
  expect(parseUrlInputsBee(';')).toEqual({
    play        : 12,
    specialMode : false,
    specialTick : undefined,
    subreddit   : 'ProgrammerHumor',
  })
})
