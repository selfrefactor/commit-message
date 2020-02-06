# UNMAINTAINABLE_JS

Based on the sarcastic idea of [https://github.com/Droogans/unmaintainable-code](https://github.com/Droogans/unmaintainable-code) which is tightly coupled with `Java`. This document try to do the same within `Javascript` context.

## Mix cases when naming

```js
const FOO = 'foo'
const bar = 'foo'
const baz_even = 'foo'
```

## Group function arguments

```js
function foo(
  a,
  b,
  c,d,
  e,
  f,
) {}
```

The logic here is that `c` and `d` are somewhat related.

## Use logical operator instead of `if`

```js
!isPathOpen() && setCount(total - total_seen);
```
