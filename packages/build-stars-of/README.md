# Sort by stars

Scrape Github dependent repos and sorts them by stars.

## Install

> yarn add sort-used-by

## Usage

```javascript
const {sortUsedBy} = require('sort-used-by')
const {outputJson} = require('fs-extra')

void async function main(){
  const result = await sortUsedBy('microsoft/playwright')

  await outputJson(`${__dirname}/sort-used-by.json`, result, {spaces:2})
}()
```

## Notes

```
         $dependants.find(`[href='${path}/network/dependents?dependent_type=REPOSITORY']`)
          $dependants.find(`[href='${path}/network/dependents?dependent_type=PACKAGE']`)
```

Similar idea is https://github.com/hacker-DOM/github-by-stars but the origin of this package is very different.