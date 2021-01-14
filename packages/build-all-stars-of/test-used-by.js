const {sortUsedBy} = require('sort-used-by')
const {outputJson} = require('fs-extra')

const repo = 'marmelab/react-admin'

void async function main(){
  const result = await sortUsedBy(repo)
  const [,fileName] = repo.split('/')
  await outputJson(`${__dirname}/assets/${fileName}.json`, result, {spaces:2})
}()