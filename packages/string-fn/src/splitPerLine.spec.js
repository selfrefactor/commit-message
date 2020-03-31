import { splitPerLine } from './splitPerLine'

const mock = 'Wert 1; Wert 2,...Wert 30 sind Werte, aus denen die Anzahl der Argumente errechnet wird.'

const log = (label, list) => list.forEach(x => {
  console.log(label, x.length)
})

test('happy', () => {
  const perLine = 36
  const result = splitPerLine({
    text : mock,
    perLine,
  })
  const expected = [ 'Wert 1; Wert 2,...Wert 30 sind', 'Werte, aus denen die Anzahl der', 'Argumente errechnet wird.' ]
  log(perLine, result)

  expect(result).toEqual(expected)
})

test('medium perLine', () => {
  const perLine = 32
  const result = splitPerLine({
    text : mock,
    perLine,
  })
  const expected = [ 'Wert 1; Wert 2,...Wert 30 sind', 'Werte, aus denen die Anzahl der', 'Argumente errechnet wird.' ]

  log(perLine, result)
  expect(result).toEqual(expected)
})

test('high perLine', () => {
  const perLine = 44
  const result = splitPerLine({
    text : mock,
    perLine,
  })
  const expected = [ 'Wert 1; Wert 2,...Wert 30 sind Werte, aus', 'denen die Anzahl der Argumente errechnet', 'wird.' ]

  log(perLine, result)
  expect(result).toEqual(expected)
})

test('perLine is bigger than input length', () => {
  const perLine = 294
  const result = splitPerLine({
    text : mock,
    perLine,
  })
  const expected = [ mock ]

  log(perLine, result)
  expect(result).toEqual(expected)
})

test('low perLine', () => {
  const perLine = 22
  const result = splitPerLine({
    text : mock,
    perLine,
  })
  const expected = [ 'Wert 1; Wert', '2,...Wert 30 sind', 'Werte, aus denen die', 'Anzahl der Argumente', 'errechnet wird.' ]

  log(perLine, result)

  expect(result).toEqual(expected)
})

test('custom split char', () => {
  const perLine = 22
  const result = splitPerLine({
    text      : mock,
    perLine,
    splitChar : ',',
  })
  const expected = [ 'Wert 1; Wert 2',
    '...Wert 30 sind Werte',
    ' aus denen die Anzahl der Argumente errechnet wird.' ]

  log(perLine, result)
  expect(result).toEqual(expected)
})
