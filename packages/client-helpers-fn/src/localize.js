const { identity, map, maybe, ok, type } = require('rambdax')
const { takeArguments } = require('string-fn')

function normalizeBoolean(input){
  return input === 'false' ? false : Boolean(input)
}

function normalizeArray(input){
  if (!input) return []

  try {
    return JSON.parse(input)
  } catch (_){
    return []
  }
}

function toString(input){
  return maybe(
    typeof input === 'object',
    JSON.stringify(input),
    typeof input === 'string' ? input : input.toString()
  )
}

function returnNormalized(input){
  if (input === null) return null
  const asString = toString(input)
  if ([ 'true', 'false' ].includes(asString)) return normalizeBoolean(input)
  if (!Number.isNaN(Number(input))) return Number(input)
  if (asString.startsWith('[')){
    const initialResult = JSON.parse(input)

    return initialResult
  }
  if (!asString.startsWith('{')) return input

  if (typeof input === 'object'){
    return map(returnNormalized, input)
  }

  try {
    const initialResult = JSON.parse(input)

    return returnNormalized(initialResult)
  } catch (e){
    return {}
  }
}

function normalizeObject(input){
  try {
    const initialResult = JSON.parse(input)

    const normalized = returnNormalized(initialResult)
    if (normalized === null) return {}

    return normalized
  } catch (e){
    return {}
  }
}

function normalize(input, type){
  if (type === undefined) return returnNormalized(input)

  const methods = {
    boolean : normalizeBoolean,
    number  : Number,
    object  : normalizeObject,
    string  : identity,
    array   : normalizeArray,
  }
  const method = methods[ type ]

  return method(input)
}

function initialGetLocalize(input){
  ok(input)({
    defaultValue : 'any',
    key          : 'string',
  })
  const typeValue = type(input.defaultValue).toLowerCase()
  const x = localStorage.getItem(input.key)

  if (x === null || x === 'null'){
    localStorage.setItem(input.key, toString(input.defaultValue))

    return input.defaultValue
  }

  return normalize(x, typeValue)
}

function initialGetLocalizeUrl(input){
  ok(input)({
    defaultValue : 'any',
    key          : 'string',
    urlKey : 'string',
  })
  const urlArguments = takeArguments(window.location.href)
  const typeValue = type(input.defaultValue).toLowerCase()
  const x = localStorage.getItem(input.key)

  if(urlArguments[input.urlKey] !== undefined){
    localStorage.setItem(input.key, toString(urlArguments[input.urlKey]))
    return normalize(urlArguments[input.urlKey], typeValue)
  }

  if (x === null || x === 'null'){

    localStorage.setItem(input.key, toString(input.defaultValue))

    return input.defaultValue
  }

  return normalize(x, typeValue)
}

function getLocalize(key, type){
  const typeValue = type === undefined ? 'string' : type
  const x = localStorage.getItem(key)

  return normalize(x, typeValue)
}
function getTypeless(key){
  return normalize(localStorage.getItem(key))
}
function setLocalize(key, value){
  localStorage.setItem(key, toString(value))
}

exports.getLocalize = getLocalize
exports.getTypeless = getTypeless
exports.initialGetLocalizeUrl = initialGetLocalizeUrl
exports.setLocalize = setLocalize
exports.normalizeLocalize = normalize
exports.initialGetLocalize = initialGetLocalize
exports.returnNormalized = returnNormalized
