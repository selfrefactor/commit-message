const { sort } = require('./sort')

test('order object', () => {
  const lines = [
    'const foo ={',
    '  c: {foo:\'bar\'},',
    '  d: null,',
    '  b:{',
    '    bar: 4,',
    '    baz: [1,2]',
    '  },',
    '  a:1,',
    '}',
    '',
  ]

  const expectedResult = [
    'const foo ={',
    '  a:1,',
    '  b: {',
    '    bar: 4,',
    '    baz: [1,2]',
    '  },',
    '  c: {foo:\'bar\'},',
    '  d: null,',
    '}',
  ]
  const result = sort(lines)
  result.map((resultInstance, i) => {
    expect(resultInstance).toStrictEqual(expectedResult[ i ])
  })
})

test('easiest', () => {
  const lines = [
    'const baz = {}',
    'const foo = {}',
    'const foo = {}',
    'const bar = {}',
  ]
  const expectedResult = [
    'const bar = {}',
    'const baz = {}',
    'const foo = {}',
    'const foo = {}',
  ]
  const result = sort(lines)

  expect(result).toStrictEqual(expectedResult)
})

test('single line unsortable', () => {
  const lines = [
    'const baz = {}',
  ]
  const expectedResult = [
    'const baz = {}',
  ]
  const result = sort(lines)

  expect(result).toStrictEqual(expectedResult)
})

test('bug 1', () => {
  const lines = [
    'const devServer = {',
    '  hot              : true,',
    '  contentBase      : \'./dev_dist\',',
    '  disableHostCheck : true,',
    '  headers          : { \'Access-Control-Allow-Origin\' : \'*\' },',
    '  stats            : \'errors-only\',',
    '  watchOptions     : {',
    '    ignored: /node_modules/,',
    '    poll : 30,',
    '    aggregateTimeout: 100,',
    '  }',
    '}',
  ]
  const expected = [
    'const devServer = {',
    '  contentBase      : \'./dev_dist\',',
    '  disableHostCheck : true,',
    '  headers          : { \'Access-Control-Allow-Origin\' : \'*\' },',
    '  hot              : true,',
    '  stats            : \'errors-only\',',
    '  watchOptions     : {',
    '    aggregateTimeout: 100,',
    '    ignored: /node_modules/,',
    '    poll : 30,',
    '  },',
    '}',
  ]
  const result = sort(lines)
  expect(result).toStrictEqual(expected)
})

test('bug 2', () => {
  const lines = [
    'const hash = {',
    '  branch: true,',
    '  model,',
    '  risk: false,',
    '  anason,',
    '}',
  ]
  const expected = [
    'const hash = {',
    '  anason,',
    '  branch: true,',
    '  model,',
    '  risk: false,',
    '}',
  ]
  const result = sort(lines)

  expect(result).toStrictEqual(expected)
})

test('change to multiline import', () => {
  const lines = [
    'import { branch, model, risk, anason } from \'rambdax\'',
  ]
  const expected = [
    'import {',
    '  anason,',
    '  branch,',
    '  model,',
    '  risk,',
    '} from \'rambdax\'',
  ]
  const result = sort(lines)

  expect(result).toStrictEqual(expected)
})

test('change to multiline require', () => {
  const lines = [
    'const{ branch, model, risk, anason } = require(\'rambdax\')',
  ]
  const expected = [
    'const{',
    '  anason,',
    '  branch,',
    '  model,',
    '  risk,',
    '} = require(\'rambdax\')',
  ]
  const result = sort(lines)

  expect(result).toStrictEqual(expected)
})

test('change to multiline function arguments', () => {
  const lines = [
    'export function foo({ branch, model, risk, anason }){',
  ]
  const expected = [
    'export function foo({',
    '  anason,',
    '  branch,',
    '  model,',
    '  risk,',
    '}){',
  ]
  const result = sort(lines)

  expect(result).toStrictEqual(expected)
})

