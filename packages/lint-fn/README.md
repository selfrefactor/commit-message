# lint-fn

Run ESLint with fix with predefined rules, which depend on the file path.

It supports Typescript files as well.

> Important - it expects `prettier` installed as global dependency

## Usage

```
// yarn add -D lint-fn
const lintFn = require("lint-fn")
await lintFn("foo.js")
await lintFn("bar.ts")
```

## Prettier

It runs before each lint command

## Skip rules

`process.env.SKIP_ESLINT_RULES = 'no-nested-ternary,max-len'
`
