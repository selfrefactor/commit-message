import { resolve } from 'path'
import { textToJs } from './textToJs'

/**
 * As `filanameLocation` patterns is too long
 * we fall back to more generic `templateLocation`
 */
const templateLocation = resolve(
  __dirname,
  '../../templates/component/epic.txt',
)

test('', () => {
  const result = textToJs(
    templateLocation,
    ['foo', 'bar'],
  )
  const expectedResult = ''

  expect(
    result.includes('foo'),
  ).toBeTruthy()

  expect(
    result.includes('bar'),
  ).toBeTruthy()

  expect(
    result.includes('${0}'),
  ).toBeFalsy()

  expect(
    result.includes('${1}'),
  ).toBeFalsy()
})
