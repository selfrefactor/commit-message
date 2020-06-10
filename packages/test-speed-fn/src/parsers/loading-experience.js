const { outputJsonSync } = require('fs-extra')

function parseLoadingExperience(loadingExperience){
  outputJsonSync(`${ __dirname }/a.json`, { a : 1 })

  return 1
}

exports.parseLoadingExperience = parseLoadingExperience
