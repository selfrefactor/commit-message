import { getNextIndex } from './getNextIndex.ts'

test('', () => {
    const result = getNextIndex({
      index: 2,
      length: 5
    })

    expect(
      result
    ).toBe(3)
})

test('', () => {
    const result = getNextIndex({
      index: 4,
      length: 5
    })

    expect(
      result
    ).toBe(0)
})
