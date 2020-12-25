const {sortUsedBy} = require('sort-used-by')
const {outputJson} = require('fs-extra')

void async function main(){
  const result = await sortUsedBy('selfrefactor/rambda')
  // await sortUsedBy('nestjs/nest')

  await outputJson(`${__dirname}/sort-used-by.json`, result)
}()