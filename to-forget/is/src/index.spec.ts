import { is, isx } from './'
import { delay } from 'rambdax'
import { resolve } from 'path'

const asyncFnFirst = async () => {}
const asyncFnSecond = async () => {}

is(
  'init', 
  resolve(__dirname, './test.d.ts')
)

test('with search.image result', () => {
  const searchImageResult = {
    height: 1453,
    imageSrc: 'http://mehr-als-stuhlkreis.de/wp-content/uploads/2016/10/JungeSelbsthilfe_Postkarte_vorderseite-1.jpeg',
    thumbSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNK64Yde3q4evY7sn-TVw18UBfa9MVEoVx006rzsUWyoqcIpTs',
    width: 2048
  }

  const assertion = is([searchImageResult], 'SearchImageResult[]')
  const assertionx = is(searchImageResult, 'SearchImageResult')

  expect(assertion).toBeTruthy()
  expect(assertionx).toBeTruthy()
})

test('with optional parameters', () => {
  const result = isx({ 
    a: 1, 
    b: 'foo', 
    c: ['foo', 'bar'],
    d: 'foo' 
  }, 'Foo')

  expect(result).toBeTruthy()
})

test('simple schema', () => {
  expect(is(['foo', 'bar'], 'string')).toBeFalsy()
  expect(is(['foo', 'bar'], 'array')).toBeTruthy()
})

test('array schema', () => {
  expect(is([asyncFnFirst, asyncFnSecond], 'async[]')).toBeTruthy()
  expect(is([delay(1),delay(1)], 'promise[]')).toBeTruthy()
  expect(is([1,2], 'number[]')).toBeTruthy()
  expect(is(['foo', 'bar'], 'string[]')).toBeTruthy()
  expect(is(['foo', 'bar'], 'string')).toBeFalsy()
})

test('interface schema', () => {
  const result = is({ a: 1, b: 'foo', c: ['foo', 'bar'] }, 'Foo')

  expect(result).toBeTruthy()
})

test('interface schema', () => {
  const result = is({ a: 1, b: 'foo', c: ['foo', 'bar', 1] }, 'Foo')

  expect(result).toBeFalsy()
})

test('list of interface schema', () => {
  const firstFoo = { a: 1, b: 'foo', c: ['foo', 'bar'] }
  const secondFoo = { a: 11, b: 'bar', c: ['foo', 'baz'] }
  const result = is([firstFoo, secondFoo], 'Foo[]')

  expect(result).toBeTruthy()
})
