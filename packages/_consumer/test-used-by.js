const {sortUsedBy} = require('sort-used-by')
const {outputJson} = require('fs-extra')

void async function main(){
  const result = await sortUsedBy('IdentityModel/oidc-client-js')
  // const result = await sortUsedBy('microsoft/playwright')
  // await sortUsedBy('nestjs/nest')

  await outputJson(`${__dirname}/oidc.json`, result, {spaces:2})
}()