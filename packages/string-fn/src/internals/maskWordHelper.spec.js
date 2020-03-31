import { range, partition } from 'rambdax'
import { maskWordHelper, maskWordHelperX } from './maskWordHelper'

test('happy', () => {
  const result = maskWordHelper('foo', '=')
  expect(result).toBe('f==')
})

test('word is too short', () => {
  const result = maskWordHelperX({ word : 'fo' })
  expect(result).toBe('f_')
})

test('word is punctuation', () => {
  const result = maskWordHelperX({ word : ',' })
  expect(result).toBe(',')
})

test('pass through if no easy mode', () => {
  const result = maskWordHelperX({ word : 'foo' })
  expect(result).toBe('f__')
})

test('pass through if shorter than 5 chars', () => {
  const result = maskWordHelperX({ word : 'mmoo' })
  expect(result).toBe('m__o')
})

test('easy mode, 5 length', () => {
  const result = maskWordHelperX({
    word       : 'fooba',
    easyMode   : true,
    easierMode : false,
  })

  expect(result).toBe('f___a')
})

test('easy mode, 6 length', () => {
  const result = maskWordHelperX({
    word       : 'foobar',
    easyMode   : true,
    easierMode : false,
  })

  expect(result).toBe('f___ar')
})

test('easy mode, random, 7 length', () => {
  const word = 'foombar'
  const whenRandom = 'fo____r'
  const whenStandard = 'f____ar'

  const result = range(0, 10).map(() => maskWordHelperX({
    word,
    easyMode   : true,
    randomMode : true,
    easierMode : false,
  }))

  const [ a, b ] = partition(
    x => x === whenStandard,
    result
  )

  expect(a.length).toBeGreaterThan(0)
  expect(b.length).toBeGreaterThan(0)
  expect(b[ 0 ]).toBe(whenRandom)
})

test('easier mode, random, 8 length', () => {
  const word = 'foomabar'
  const whenRandom = 'fo___bar'
  const whenStandard = 'foo___ar'

  const result = range(0, 10).map(() => maskWordHelperX({
    word,
    easyMode   : false,
    randomMode : true,
    easierMode : true,
  }))

  const [ a, b ] = partition(
    x => x === whenStandard,
    result
  )

  expect(a.length).toBeGreaterThan(0)
  expect(b.length).toBeGreaterThan(0)
  expect(b[ 0 ]).toBe(whenRandom)
})

test('easy mode, 9 length', () => {
  const word = 'foomazbar'
  const expected = 'fo____bar'

  const result = maskWordHelperX({
    word,
    easyMode   : true,
    randomMode : false,
    easierMode : false,
  })

  expect(result).toBe(expected)
})

test('easier mode, 9 length', () => {
  const word = 'foomazbar'
  const expected = 'foo___bar'

  const result = maskWordHelperX({
    word,
    easyMode   : false,
    randomMode : false,
    easierMode : true,
  })

  expect(result).toBe(expected)
})
