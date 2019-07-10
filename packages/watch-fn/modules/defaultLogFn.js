const R = require("rambda")
const {log} = require("helpers")

const defaultLogFn = logArguments => {
  if(R.type(logArguments)==="String"){
    log(logArguments,"info")
  }else{
    if(!(logArguments===undefined)){
      console.log(logArguments)
    }
  }
}

module.exports = defaultLogFn
