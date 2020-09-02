# Redis-fn

Redis helper library

## Install

`yarn add https://github.com/selfrefactor/redis-fn#0.2.0`

## Usage

```
const { redisFn } = require("redis-fn")
const redis = await redisFn({
  defaultExpiryFlag  : true,
  defaultExpiryValue : 1,
})

redis.set({
  key   : KEY,
  value : VALUE,
})
```

## Methods

### Set

```
redis.set({
  key   : KEY,
  value : VALUE,
})
```

### Get

```
redis.get( KEY ) 
// => VALUE
```
