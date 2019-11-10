[![CircleCI](https://img.shields.io/circleci/project/github/selfrefactor/do.svg)](https://circleci.com/gh/selfrefactor/do)
[![Codecov](https://img.shields.io/codecov/c/github/selfrefactor/do.svg)](https://codecov.io/gh/selfrefactor/do)

# do

```javascript
const {doModule} = require('do')
const {resolve} = require('path')

doModule({
  mode:'REACT', // or 'NODE'
  srcDirectory: resolve(__dirname, '../src'),
  packageJson: resolve(__dirname, '../package.json')
}).then(affectedFiles=> {
  // `affectedFiles`
})
```

## TODO

- Add additional Javascript module with `exports.foo = foo`

- use r.inject instead of r.replace

## check

```javascript
const {check} = require('do')
const {resolve} = require('path')

check(resolve(__dirname, '../src'))
```

## Expected React markers

> Placed in `typings.d.ts`

### `// ACTION_INTERFACES`

### `// CONSTANTS`

### `// INJECT_COMPONENT`

### `// GET_STATE`

---

> Placed in `index.tsx`

### `// COMPONENTS`

where you import components

### `{/* ROUTES_MARKER */}`

where you declare `<Route>` components

> Placed in `root/combinedReducers.ts`

### `// CONNECT_STORES`

### `// IMPORT_STORES`

---
> Placed in root epic `root/epics/index.ts`
> Placed in already existing components `foo/epics/index.ts`

### `// IMPORT_EPICS`

### `// CONNECT_EPICS`

---

> Placed in already existing components `foo/epics/actions.ts`

### `// IMPORT_CONSTANTS`

### `// ACTIONS`

---

## TODO

- starter action should not be limited to `root.` but to other components

## Reaction Epic

1. Start action

If such action doesn't exist, then create it.

2. End action.

If such action doesn't exist, then create it.

3. Edit reducer to include end action and return `state`

## Async epic

1. Name

2. Start action

3. What to place within `switchMap`

It can me one of:

- Dependency injection modules

- as a file in namespaced `_modules` folder

- as a file in top level `_modules` folder

4. What to place within final `map`

It can me one of:

- as an exported action in root's `actions.ts`

- as an exported action in namespaced `actions.ts`

- a new namespaced action that will be created(together with its coresponding constant)

If one of the last two options is actual, then namespaced `reducers.ts` will include
appropriate action response.