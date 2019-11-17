import { translateNumber } from './translateNumber'

test.only('', () => {
  expect(translateNumber(525)).toEqual('петстотин двадесет и пет')  
})

test('', () => {
  expect(translateNumber(105)).toEqual('сто и пет')  
})

test('', () => {
  expect(translateNumber('105-B')).toEqual('______')  
})

test('', () => {
  expect(translateNumber(115)).toEqual('сто и петнадесет')  
})

test('', () => {
  expect(translateNumber(125)).toEqual('сто двадесет и пет')  
})

test('', () => {
  expect(translateNumber(50)).toEqual('петдесет')  
})

test('', () => {
  expect(translateNumber(75)).toEqual('седемдесет и пет')  
})

test('', () => {
  expect(translateNumber(13)).toEqual('тринадесет')  
})

test('', () => {
  expect(translateNumber(1)).toEqual('едно')  
})