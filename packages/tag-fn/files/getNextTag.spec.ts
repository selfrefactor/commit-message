import { getNextTag } from './getNextTag'

test('when patch', () => {
  expect(getNextTag('0.1.0', 'patch')).toEqual('0.1.1')
  expect(getNextTag('0.1.9', 'patch')).toEqual('0.2.0')
  expect(getNextTag('0.2.2', 'patch')).toEqual('0.2.3')
})

test('when minor', () => {
  expect(getNextTag('0.1.0', 'minor')).toEqual('0.2.0')
  expect(getNextTag('0.1.5', 'minor')).toEqual('0.2.0')
  expect(getNextTag('1.9.2', 'minor')).toEqual('2.0.0')
})

test('when minor and pajor', () => {
  expect(getNextTag('0.9.9', 'patch')).toEqual('1.0.0')
  expect(getNextTag('4.9.9', 'patch')).toEqual('5.0.0')
})

test('when major', () => {
  expect(getNextTag('0.1.0', 'major')).toEqual('1.0.0')
  expect(getNextTag('9.2.6', 'major')).toEqual('10.0.0')
})
