# Package-storage

Use `package.json` as library storage space

## Usage

```typescript
import {save} from 'package-storage'

save(
  'FIRST_CONTEXT',
  'SECOND_CONTEXT',
  [1, 2, 3]
)
```

---

```typescript
import {load} from 'package-storage'

const allFirstContext = load('FIRST_CONTEXT')
const secondContext = await load(
  'FIRST_CONTEXT',
  'SECOND_CONTEXT'
)
```

## Features

When `process.env.PACKAGE_STORAGE === 'true'` then it searches for `process.cwd()/package.json`

When error occurs in `load`, it will simply return an empty object.
When error occurs in `save`, it will simply return `false`.