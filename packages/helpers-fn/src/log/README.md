# Log-fn

Logging library build with 'chalk'

## Example use

```
// yarn add log-fn
const log = require('log-fn')
log('foo')

const x = {bar: {baz: 'foo'}}
log({x}, 'pattern')
```

## Typing

```
log(...inputCollection: Array<any>, rules: String)
```

## Rules

- Your last argument act as rule for logging.
- You can pass more than one rule using separator `.`
- For example `log(1,'icon.back')`
- You can disable `log-fn` all along by setting `process.env.LOG_FN_FLAG` to `false`

### Default behaviour

> log(x)

```
log(1,2,3, ["foo"], null) // Line 1
log(1, {a: 1}, undefined) // Line 2
log('foo', 'bar') // Line 3
```

Line 1 will log all of the inputs using the first color of predefinet set of colors.
Line 2 will log all of the inputs using the second color of predefinet set of colors.

When object is passed as part of `inputCollection`, it will go to the end of the log.

The reason is that `chalk` works with strings, and objects don't have `toString` method.
So objects are logged with plain `console.log`, while all other types use `chalk`.

Line 3 will log only `'foo'` as last argument `'bar'` is a `String` and is used as `rules` option.

#### With background

> (log(x, 'back'))

// if array with object

```
log(1,2,3, ["foo"], null, 'back') // Line 4
log(1, {a: 1}, undefined, 'back') // Line 5
```

The same as default behaviour, but we are setting not only the color of the text,
but also its background.

#### Pattern logging

> log({ x }, 'pattern')
