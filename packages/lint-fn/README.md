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

Should be globally installed
