const {getParsed} = require('./getParsed')

function load(first, maybeSecond, localFlag = false){
  const {parsed} = getParsed(localFlag)
  if(parsed === undefined) return {}

  const currentState = parsed[first] === undefined ?
    {} :
    parsed[first]
    
  return maybeSecond === undefined ?
    currentState :
    currentState[maybeSecond]
}

exports.load = load