const {resolve} = require('path')
const {readFileSync, existsSync} = require('fs')

function getParsed(localFlag){
  try {
    const masterLocation = `${process.cwd()}/package.json`
    const locationRaw = localFlag === true ?
       masterLocation :
      resolve(__dirname,'../../package.json')

    const location = process.env.PACKAGE_STORAGE === 'true' ?
      masterLocation :
      locationRaw

    if(!existsSync(location)){
      return false
    }
  
    const content = readFileSync(location).toString()
    const parsed = JSON.parse(content)
  
    return {parsed, location}
  } catch (e) {
    throw e
  } 
}

exports.getParsed = getParsed