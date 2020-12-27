const { piped, sort, uniq } = require( "rambdax")

function sortResult(input){
  return piped(
    input,
    uniq,
    sort((a, b) => a.stars > b.stars ? -1:1)
  ) 
}

exports.sortResult = sortResult