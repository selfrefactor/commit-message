# Init-puppeteer

It starts a `Puppeteer` instance and attaches multiple helpers to it. It includes also helpers to turn `Puppeteer` into a end-to-end testing framework.

## Install

`yarn add https://github.com/selfrefactor/init-puppeteer#5.8.0``

## Env

```
MATCH_DIR
HEADLESS_TEST
SCREEN_DIR
```

## API

### initPuppeteer(options: Options): Output

Such as options follow this `Typescript` rules:

```
  extraProps?: object
  resolution?: Resolution
  url?: string
  mobile?: boolean
  headless?: boolean
  waitCondition?: WaitConditions
  logFlag?: boolean
```

## Snaps

pass `PUPPETEER_SNAP` as `OFF` to forbid `_.snap` to take screenshots

## Step delay

Set `process.env.STEP_DELAY=1000` for 1 second delay after each `$` or `$$` evaluation.

## Debug

If `process.env.PUPPETEER_DEBUG = 'true'` then headless mode is turned off even if we pass `headless:true` during initialization.

## Example

```typescript
const { initPuppeteer } = require('init-puppeteer')

const ILEARNSMARTER = 'https://ilearnsmarter.com/'

void async function debug() {
  try {
    console.log('start')
    var { browser, page } = await initPuppeteer({
      headless: false,
      logFlag: false,
      url: ILEARNSMARTER,
    })

    const _ = attach(page)
    const x = await _.$$('div', els => els.length)
    console.log({x})

    await browser.close()
  } catch (e) {
    console.log(e)
  }
}()
```

## Typescript example

```typescript
import { initPuppeteer } from 'init-puppeteer'
import {
  InputPuppeteer,
  OutputPuppeteer,
} from 'init-puppeteer/typings'

async function fn(): Promise<void>{
  try{
      const settings: InputPuppeteer = {
        headless: true,
        url: 'about:blank',
      }

      var { browser, page }: OutputPuppeteer = await initPuppeteer(settings)
      // WORK
      return
     }catch (err){
    console.log(err)
  }finally{
    console.log('closing Chrome')
    if (browser !== undefined){
      await browser.close()
    }
  }
}
```

## input.waitCondition

Could be a string among `LOAD, NETWORK, DOM`. In this case timeout is 60 seconds.

It can be also Puppeteer's `NavigationOptions` in which case `input.waitCondition` will passed directly to `page.goto`.
