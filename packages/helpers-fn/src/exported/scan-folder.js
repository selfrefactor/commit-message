const { existsSync } = require('fs')
const { fdir } = require('fdir')
const defaultFilterFn = x => x.endsWith('.js')
const defaultExcludeFn = x => x.includes('node_modules') || x.startsWith('.')

async function scanFolder({
  folder,
  filterFn = defaultFilterFn,
  excludeFn = defaultExcludeFn,
}){
  if (!existsSync(folder)){
    throw new Error(`${ folder } - folder path is wrong as it doesn't exist`)
  }

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
