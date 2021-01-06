const { piped, sort, uniq, omit } = require( "rambdax")

function parseResult(input){
  return piped(
    input,
    omit('isValid'),
    uniq,
    sort((a, b) => a.stars > b.stars ? -1:1)
  ) 
}

exports.parseResult = parseResult