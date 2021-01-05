# Sort by stars

Scrape Github dependent repos and sorts them by stars.

## Install

> yarn add sort-used-by

## Usage

```javascript
const {sortUsedBy} = require('sort-used-by')
const {outputJson} = require('fs-extra')

void async function main(){
  const result = await sortUsedBy({repo: 'microsoft/playwright'})

  await outputJson(`${__dirname}/sort-used-by.json`, result, {spaces:2})
}()
```

## Notes

Similar idea is https://github.com/hacker-DOM/github-by-stars but this is not the origin for the creation of this package.