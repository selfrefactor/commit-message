# FileSystem DataBase

## Case 1

> One label define single database

```
const LABEL = 'foo'
const {id} = await push({a:1},LABEL)
await push({a:20},LABEL)
const allState = loadJson(LABEL)
const singleInstance = load(id)
```

## Case 2

> Two labels define `child as a file` logic

```
const LABEL = 'foo'
await save({translated:'more'},LABEL, 'mehr')
await save({translate: 'less'},LABEL, 'wenig')
const allState = loadAll(LABEL)
const singleInstance = load(LABEL, 'mehr')
const updatedInstance = await update({
  ...singleInstance,
  existingProp: 2,
  newProp: 6
})
```

## API

`save` method for direct json modification
`update` for data stored with `push`