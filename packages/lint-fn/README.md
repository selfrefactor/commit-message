# lint-fn

Run ESLint with fix with predefined rules, which depend on the file path.

It supports Typescript files as well.

## Usage

```
// yarn add -D lint-fn
const lintFn = require("lint-fn")
await lintFn("foo.js")
await lintFn("bar.ts")
```

## Debug prettier

\_modules/usePrettier.js

const DEBUG = 1

## Skip rules

process.env. SKIP_ESLINT_RULES = 'no-nested-ternary, max-len'
