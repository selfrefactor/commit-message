const { piped, sort, uniq, map, omit } = require('rambdax')

function parseResult(input){
  return piped(
    input,
    map(omit('isValid')),
    uniq,
    sort((a, b) => a.stars > b.stars ? -1 : 1)
  )
}

exports.parseResult = parseResult
