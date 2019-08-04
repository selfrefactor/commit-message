# lint-fn

Run ESLint with fix with predefined rules, which depend on the file path.

## Usage

```
// yarn add -D lint-fn
const lintFn = require("lint-fn")
lintFn({filePath:"foo.js"})
.then(console.log)
```

## Prettier

It runs before each lint command

## Skip rules

`process.env.SKIP_ESLINT_RULES = 'no-nested-ternary,max-len'
`
