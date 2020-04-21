import { delay } from 'rambdax'
import assert from 'assert'
import {runTests} from './runTests'

const testFn = x => typeof x.a === 'number'

const testData = [
  { a : 3 },
  {
    ok    : { a : 1 },
    label : 'happy',
    match : true,
  },
  { fail : { a : true } },
  { fail : { b : true } },
  { danger : null },
  {
    danger : null,
    match  : 'Cannot read property \'a\' of null',
  },
]

const runTestsInput = {
  label : 'foo',
  data  : testData,
  fn    : testFn,
}
runTests(runTestsInput)

const withObjectFn = x => ({
  ...x,
  foo : x.bar + 1,
})

const withObjectData = [
  {
    ok    : { bar : 1 },
    match : {
      bar : 1,
      foo : 2,
    },
  },
  {
    ok    : { bar : 1 },
    match : {
      bar : 1,
      foo : 2,
    },
    label : 'dancing days',
  },
]

const withObject = {
  label : 'with.object',
  data  : withObjectData,
  fn    : withObjectFn,
}
runTests(withObject, { logFlag : false })

const withAsyncFn = async x => {
  await delay(100)
  if (!x) throw new Error('foo.error')

  return x + 1
}

const withAsyncData = [
  {
    ok    : 1,
    match : 2,
  },
  {
    fail  : 1,
    match : 3,
    label : 'tea for one',
  },
  { danger : null },
  {
    danger : null,
    match  : 'foo.error',
  },
  {
    danger : null,
    match  : new Error('foo.error'),
  },
]

const withAsync = {
  label : 'works with async',
  fn    : withAsyncFn,
  data  : withAsyncData,
}

runTests(withAsync, { async : true })

let counter = 0

const withOnly = {
  label : 'with.only',
  data  : [
    { ok : 1 },
    {
      ok   : 12,
      only : true,
    },
    { ok : 4 },
  ],
  fn : () => {

    counter++

    return true
  },
}

runTests(withOnly, { callback : () => assert(counter === 1) })

test('undefined throws', () => {
  expect(() => runTests()).toThrow()
})

test('missing `testSuite`', () => {
  expect(() =>
    runTests(omit('testSuite', runTestsInput))
  ).toThrow()
})
