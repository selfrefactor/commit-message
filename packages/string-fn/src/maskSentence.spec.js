import { maskSentence } from './maskSentence'

test('english with apostrophe', () => {
  const sentence = 'You didn\'t, do much'
  const expectedVisible = [ 'Y__', 'd____t', ',', 'd_', 'm__h' ]
  const expectedHidden = [ 'You', 'didn\'t', ',', 'do', 'much' ]

  const { hidden, visible } = maskSentence({ sentence })

  expect(hidden).toEqual(expectedHidden)
  expect(visible).toEqual(expectedVisible)
})

test('bulgarian when first word is focus word', () => {
  const sentence = 'Някога е имало по-добри времена'
  const expectedVisible = [ 'Н____а', 'е', 'имало', 'по-добри', 'времена' ]
  const expectedHidden = [ 'Някога', 'е', 'имало', 'по-добри', 'времена' ]

  const { hidden, visible } = maskSentence({
    sentence,
    words : [ 'Някога' ],
  })

  expect(hidden).toEqual(expectedHidden)
  expect(visible).toEqual(expectedVisible)
})

test('bulgarian with dash(-)', () => {
  const sentence = 'Някога е имало по-добри времена'
  const expectedVisible = [ 'Н____а', 'е', 'и___о', 'п______и', 'в_____а' ]
  const expectedHidden = [ 'Някога', 'е', 'имало', 'по-добри', 'времена' ]

  const { hidden, visible } = maskSentence({ sentence })

  expect(hidden).toEqual(expectedHidden)
  expect(visible).toEqual(expectedVisible)
})

test('happy', () => {
  const sentence = 'it was, for what i need, good.'
  const expectedHidden = [ 'it', 'was', ',', 'for', 'what', 'i', 'need', ',', 'good', '.' ]

  const expectedVisible = [ 'i_', 'w__', ',', 'f__', 'w__t', 'i', 'n__d', ',', 'g__d', '.' ]

  const { hidden, visible } = maskSentence({ sentence })

  expect(hidden).toEqual(expectedHidden)
  expect(visible).toEqual(expectedVisible)
})

test('easy mode, no random', () => {
  const sentence = 'Unnecessary complexity killed the cat.'
  const expectedHidden = [
    'Unnecessary',
    'complexity',
    'killed',
    'the',
    'cat',
    '.',
  ]
  const expectedVisible = [
    'Un______ary',
    'co_____ity',
    'k___ed',
    't__',
    'c__',
    '.',
  ]
  const { hidden, visible } = maskSentence({
    sentence,
    easyMode : true,
  })
  expect(hidden).toEqual(expectedHidden)
  expect(visible).toEqual(expectedVisible)
})

test('easy mode, low char limit', () => {
  const sentence = 'Unnecessary complexity killed th cat.'
  const expectedHidden = [
    'Unnecessary',
    'complexity',
    'killed',
    'th',
    'cat',
    '.',
  ]
  const expectedVisible = [
    'Un______ary',
    'co_____ity',
    'k___ed',
    'th',
    'c_t',
    '.',
  ]
  const { hidden, visible } = maskSentence({
    sentence,
    easyMode  : true,
    charLimit : 1,
  })
  expect(hidden).toEqual(expectedHidden)
  expect(visible).toEqual(expectedVisible)
})

