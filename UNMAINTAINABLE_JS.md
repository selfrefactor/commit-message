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

## Two donkeys on a same bridge

Most of bad code happens due to the stubbornness of semi-useful ideas, such as: 

### Use two computers as your personal workstations

The problem is that I have personal and work computer and I wanted to sync local databases between them

### Create Angular-CLI for React

It makes sense, but it makes more sense to drop React. Still this deleted code was reason to switch to Angular, as I enjoyed the structure that it brings.

### Use Typescript definitions in Jest tests

### Use file system database instead of actual database

Still, such database is useful for backup and restoration of database state.

### Hanging too long on React

