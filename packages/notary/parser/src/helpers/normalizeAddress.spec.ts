import { normalizeAddress } from './normalizeAddress'

test('', () => {
  const input = 'гр. Свищов, п.к. 5250, ул. ПАТРИАРХ ЕВТИМИЙ № 72, бл. 2, вх. Б, ет. 6, ап. 16'
  const inputx = 'гр. Свищов, п.к. 5250, ул. ПАТРИАРХ ЕВТИМИЙ № 72'
  const expectedResult = `гр. Свищов, п.к. 5250, ул. „Патриарх Евтимий“ 72/седемдесет и две/, бл.2/две/, вх.“Б“, ет.6/шест/, ап.16/шестнадесет/`

  expect(
    normalizeAddress(input)
  ).toEqual(expectedResult)
})