const { defaultTo, tryCatch, omit, pick } = require('rambdax')

let holder = undefined

const missingInit = 'Storage was not set; created with label CLIENT_HELPERS'
const exists = key => localStorage.getItem(key) !== null

function masterReset(){
  localStorage.setItem(
    holder,
    '{}'
  )
  holder = undefined
}

function getState(keys){
  if (holder === undefined){
    initLocalState('CLIENT_HELPERS')
    console.warn(missingInit)

    return {}
  }

  const stateRaw = localStorage.getItem(
    holder
  )

  const state = tryCatch(
    JSON.parse,
    {}
  )(stateRaw)

  return keys === undefined ?
    state :
    pick(keys, state)
}

function setState(newState){
  localStorage.setItem(
    holder,
    JSON.stringify(
      newState
    )
  )
}

function initLocalState(masterKey, maybeObject){
  holder = masterKey

  if (exists(masterKey)){
    if(!maybeObject) return

    setState({
      ...getState(),
      ...maybeObject
    })
  }else{
    setState(
      defaultTo({}, maybeObject)
    )
  }
}

function getter(key){
  return getState()[ key ]
}

function getterAnt(hash){
  const state = getState()
  const keys = Object.keys(state)

  const exitHash = {}
  Object.entries(hash).forEach(([ hashProp, hashValue ]) => {
    if (keys.includes(hashProp)){
      exitHash[ hashProp ] = state[ hashProp ]
    } else {
      exitHash[ hashProp ] = hashValue
    }
  })

  return exitHash
}

function getterAntReset(hash){
  const state = getState()
  setState({
    ...state,
    ...hash,
  })

  return hash
}

function setter(key, value){
  const state = getState()

  state[ key ] = value
  setState(state)
}

function resetter(keys, extraFlag){
  setState(
    omit(keys, getState())
  )
  if (extraFlag){
    return getState()
  }
}

function push(key, value){
  const state = getState()
  const listRaw = state[ key ]
  const list = Array.isArray(listRaw) ?
    listRaw :
    []
  
  list.push(value)
  state[ key ] = list
  setState(state)
}

function pushUniq(key, value){
  const state = getState()
  const listRaw = state[ key ]
  const list = Array.isArray(listRaw) ?
    listRaw :
    []

  if(list.includes(value)) return

  list.push(value)
  state[ key ] = list
  setState(state)
}

exports.push = push
exports.pushUniq = pushUniq
exports.getter = getter
exports.getterAnt = getterAnt
exports.getterAntReset = getterAntReset
exports.setter = setter
exports.resetter = resetter
exports.masterReset = masterReset
exports.masterSetter = setState
exports.masterGetter = getState
exports.initLocalState = initLocalState
