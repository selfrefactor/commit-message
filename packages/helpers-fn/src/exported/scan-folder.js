const fdir = require('fdir')
const defaultFilterFn = x => x.endsWith('.js')
const defaultExcludeFn = x => x.includes('node_modules') || x.startsWith('.')

async function scanFolder({
  folder,
  filterFn = defaultFilterFn,
  excludeFn = defaultExcludeFn,
}){
  const files = await new fdir()
    .withMaxDepth(3)
    .withFullPaths()
    .exclude(excludeFn)
    .filter(filterFn)
    .crawl(folder)
    .withPromise()

  return files
}

exports.scanFolder = scanFolder
