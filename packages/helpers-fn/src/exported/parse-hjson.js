const { existsSync } = require('fs')
const { parse } = require('hjson-js')
const { readFile, outputJson } = require('fs-extra')
const { replace } = require('rambdax')

async function parseHjson(filePath){
  if (!existsSync(filePath)){
    throw new Error(`${ filePath } - file path is wrong as it doesn't exist`)
  }
  if (!filePath.endsWith('.hjson')){
    throw new Error(`${ filePath } is not hjson`)
  }

  const output = replace(
    '.hjson', '.json', filePath
  )
  const content = (await readFile(filePath)).toString()
  const parsed = parse(content)
  await outputJson(
    output, parsed, { spaces : 2 }
  )

  return parsed
}

exports.parseHjson = parseHjson
