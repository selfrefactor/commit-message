import { sortBy, pass } from 'rambdax'
import { questionListBee, wordListAnt, parseInputWhenComplex } from './questionList'

const input = "used[had][need][want][require]"  
const inputComplex = '[moe.is.where][nova.selection][fio.zaz]'

const schema = {
  correct: Boolean,
  text: String,
  status: ['ACTIVE']
}

test('word list', () => {
  const result = wordListAnt(input)
  const expected = [ 'used', 'had', 'need', 'want', 'require' ] 

  expect(result).toEqual(expected)
})

test('question list', () => {
  const result = questionListBee(input)
  result.forEach(singleResult => {
    expect(
      pass(singleResult)(schema)
    ).toBeTruthy()
  })
})


test('with two options', () => {
  const result = questionListBee('used[had]')

  const sorted = sortBy(
    x => x.text
  )(result)
  const expected = [ 
    { correct: false, text: '_', status: 'ACTIVE' },
    { correct: false, text: 'had', status: 'ACTIVE' },
    { correct: true, text: 'used', status: 'ACTIVE' },
  ]

  expect(sorted).toEqual(expected)
})

test('parse complex input', () => {
  const result = parseInputWhenComplex(inputComplex)

  expect(result).toEqual('moe is where[nova selection][fio zaz]')
})

test('parse complex input', () => {
  const result = parseInputWhenComplex(inputComplex)

  expect(result).toEqual('moe is where[nova selection][fio zaz]')
})

test('parse complex input', () => {
  const result = questionListBee(inputComplex, true)
  const sorted = sortBy(
    x => x.text
  )(result)

  const expected = [ 
    { correct: false, text: 'fio zaz', status: 'ACTIVE' },
    { correct: true, text: 'moe is where', status: 'ACTIVE' } 
    { correct: false, text: 'nova selection', status: 'ACTIVE' },
  ]

  expect(sorted).toEqual(expected)
})

