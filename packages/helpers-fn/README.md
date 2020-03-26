# Helpers

Various server-side helpers

## Loading bar

```
const { loadingBar } = require('helpers')

const loadingBarFn = loadingBar(4)
expect(loadingBarFn()).toBe('🀱🀱🀱🀱')
```

## Loading bar in CLI

```
const {delay} = require('rambdax')
const {startLoadingBar, stopLoadingBar} = require('helpers')

void async function test(){
  startLoadingBar({
    stopAfter: 10000
  })
  await delay(7000)
  stopLoadingBar()
}()
```

## Jest prepare files
