
[![CircleCI](https://img.shields.io/circleci/project/github/selfrefactor/is.svg)](https://circleci.com/gh/selfrefactor/is)
[![Codecov](https://img.shields.io/codecov/c/github/selfrefactor/is.svg)](https://codecov.io/gh/selfrefactor/is)

# is

Reuse Typescript definitions in Jest or Node.js context

## How to install

`yarn add https://github.com/selfrefactor/is#0.5.0`

## How to set-up with Jest

- Create a file `testPrepare.js` somewhere in your project

```javascript
const isLib = require('is')
isLib.is('init', 'YOUR_FULL_PATH_TO/typings.d.ts')

expect.extend({
  is(received, argument) {
    const pass = isLib.is(received, argument);
    if (pass) {
      return {
        message: () => `expected ${received} to have typing '${argument}'`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to not have typing '${argument}'`,
        pass: false,
      }
    }
  },
  isx(received, argument) {
    const pass = isLib.isx(received, argument);
    if (pass) {
      return {
        message: () =>
          `expected ${received} to have typing '${argument}'`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to not have typing '${argument}'`,
        pass: false,
      }
    }
  },
})
```

- Then edit your **Jest** property in `package.json` add:

```
"setupTestFrameworkScriptFile": "<rootDir>/files/testPrepare.js",
```

Replace `<rootDir>/files/testPrepare.js` with your path to `testPrepare.js`

## How to set-up in Node.js

- You need to initialize first:

```
import { is } from 'is'
is('init', 'YOUR_FULL_PATH_TO/typings.d.ts')
```

- Afterwards you can use it anywhere in your code:

```javascript
import { is } from 'is'

const db = getDB()

if(!db.is('DBInstance[]')){
  throw Error('Received database is not of array of DBInstance')
}
```

There is also `isx` method in which all optional interface properties are required.

In other words, `is` method ingnores the optional interface properties, while `isx` respects them.

## Matchers

- Plain

```javascript
is(1, 'number') // => true
is('foo', 'string') // => true
is([], 'array') // => false
is('', 'string') // => false
```

Note that empty instances of string or array) are not passing the comparision.

- Array of simple types

```javascript
is([1, 2], 'number[]') // => true
is(['foo', 'bar'], 'string[]') // => true
```

- Interface

Sample content of `typings.d.ts`:

```typescript
interface Foo {
  a: number
  b: string
  c: string[]
  d?: string
}
```

```javascript
const input = {
  a: 1,
  b: 'foo'
  c: ['bar', 'baz']
}

const inputSecond = {
  ...input,
  d: 'zeppelin'
}

is(input,'Foo') //=> true
isx(input,'Foo') //=> false

is(inputSecond,'Foo') //=> false
isx(inputSecond,'Foo') //=> true
```

As you can see, additional properties in inspeceted object causes falsy result.

- Array of interface

```javascript
const input = {
  a: 1,
  b: 'foo'
  c: ['bar', 'baz']
}

const inputSecond = {
  ...input,
  a: 2
}

is([input, inputSecond],'Foo[]') //=> true
```

## TODO

- Support types

- Add Typescript instructions

- Support passing string instead of filepath

This would allow client-side usage

## Not covered

The purpose is to assert the end result, so questions like 'Is varible `foo` a promise that resolve to a string?' are useless.

In this case, you should resolve `foo` and assert the result.

## Debug

Set `process.env.IS_DEBUG` to `true`
