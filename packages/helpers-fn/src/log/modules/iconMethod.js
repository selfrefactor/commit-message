const figures = require('figures')
const helpers = require('./helpers')
const R = require('rambdax')

const iconMethod = (inputCollection, behaviourCollection) => {
  if (helpers.isMyMode('ICON', behaviourCollection) === false){
    return
  }
  const tag = helpers.getTag(behaviourCollection)
  let icon

  if (tag === false){
    icon = helpers.getIcon()
  } else if (helpers.cache[ tag ] === undefined){
    icon = helpers.getIcon()
    helpers.cache[ tag ] = icon
  } else {
    icon = helpers.cache[ tag ]
  }

  return R.prepend(figures[ icon ])(inputCollection)
}

module.exports = iconMethod
