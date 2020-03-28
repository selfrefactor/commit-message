const R = require('rambda')
const { log } = require('helpers-fn')

const defaultLogFn = logArguments => {
  if (R.type(logArguments) === 'String'){
    log(logArguments, 'info')
  } else if (!(logArguments === undefined)){
    console.log(logArguments)
  }
}

module.exports = defaultLogFn
