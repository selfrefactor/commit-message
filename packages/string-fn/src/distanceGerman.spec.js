import { distanceGerman } from './distanceGerman'

test('happy', () => {
  expect(distanceGerman('der anlass', 'der Anlaß')).toEqual(0)
  expect(distanceGerman('die Männer', 'die manner')).toEqual(0)
})

