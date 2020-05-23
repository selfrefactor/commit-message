const fdir = require('fdir')
const defaultFilterFn = x => x.endsWith('.js')
const defaultExcludeFn = x => x.includes('node_modules') || x.startsWith('.')

export async function readFolder({
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

exports.readFolder = readFolder
