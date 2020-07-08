const { writeFileSync } = require('fs')

const {getParsed} = require('./getParsed')

function save(
  firstContext, 
  secondContextOrValue, 
  maybeValue,
  localFlag
){
  const isOneLeveled = maybeValue === undefined

  const value = isOneLeveled ? 
    secondContextOrValue :
    maybeValue
     
  const { location, parsed } = getParsed(localFlag)
  if(parsed === undefined) return false

  const newPackageJson = isOneLeveled ?
    {...parsed, [firstContext]: value} :
    {
      ...parsed, 
      [firstContext]: {
        ...parsed[firstContext], 
        [secondContextOrValue]: maybeValue
      }
    }

  writeFileSync(
    location, 
    JSON.stringify(newPackageJson, null, 2)
  )
}

exports.save = save