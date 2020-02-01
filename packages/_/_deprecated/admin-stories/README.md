# Stories

> As it uses `Storybook`

## Options component

There could be only one instance as oterwise we have way toomany ke bindings.

## Graphql

```javascript

import { request } from 'graphql-request'

const query = `{
  Instance(id: 1) {
    dePart
  }
}`

request('http://localhost:3222', query).then(data =>
  console.log(data)
)
```