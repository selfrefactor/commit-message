import { fitWithinLines } from './fitWithinLines'
import { getMaxLength } from './getMaxLength'

const mock = 'Es ist wichtig, Ihren Bedarf an detaillierten Informationen gegen die Notwendigkeit abzuwägen, Dateigröße und -anzahl zu begrenzen.'

test('happy', () => {
  const result = fitWithinLines({
    text    : mock,
    limit   : 3,
    perLine : 50,
  })
  const maxLength = getMaxLength(result)

  expect(maxLength).toBe(48)
  expect(result.length).toBe(3)
})

test('lower within lines', () => {
  const result = fitWithinLines({
    text    : mock,
    limit   : 2,
    perLine : 50,
  })
  const maxLength = getMaxLength(result)

  expect(maxLength).toBe(65)
  expect(result.length).toBe(2)
})

test('lower per line', () => {
  const result = fitWithinLines({
    text    : mock,
    limit   : 3,
    perLine : 30,
  })
  const maxLength = getMaxLength(result)

  expect(maxLength).toBe(47)
  expect(result.length).toBe(3)
})

test('high lines low per line', () => {
  const result = fitWithinLines({
    text    : mock,
    perLine : 20,
    limit   : 6,
  })
  const maxLength = getMaxLength(result)

  expect(maxLength).toBe(24)
  expect(result.length).toBe(6)
})

test('when it throws', () => {
  expect(() => fitWithinLines({
    text    : mock,
    perLine : 150,
    limit   : 6,
  })).toThrow()
})

