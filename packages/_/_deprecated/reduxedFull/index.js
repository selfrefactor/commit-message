const React = require('react')
const { takeArguments } = require('string-fn')
const {
  head,
  isPromise,
  isType,
  headObject,
  omit,
  path,
  random,
  remove,
  tail,
} = require('rambdax')
const { log } = require('./log')
const { colorLog } = require('./colorLog')

const NEW_STATE_LOG_INDEX = 11
const CAN_LOG = process.env.NODE_ENV === 'development'
const isRouterAction = action => action.type.endsWith('@ROUTE_CHANGE')

// Helper that defines what action is
// ============================================
function isAction(maybeAction){
  if (!isType('Object', maybeAction)) return false

  return typeof maybeAction.type === 'string'
}

// Logging helper for reducers
// ============================================
function reducerLog(action, result){
  // if (!CAN_LOG) return

  const label = `REDUCER.ACTION.RESULT - ${ action.type }`
  if (action.payload === undefined){
    return log(
      label,
      result
    )
  }

  log(
    label,
    {
      result,
      payload : action.payload,
    }
  )
}

// Substitute for Redux-dev-tools
// It needs coloring and optional diff change with env flag
// ============================================
function reduxLog(action){
  // if (!CAN_LOG) return

  const logIndex = isRouterAction(action) ? 0 : random(1, 3)
  if (action.payload === undefined){
    return colorLog(logIndex, `START - ${ action.type }`)
  }

  return colorLog(logIndex, `START - ${ action.type }`, action.payload)
}

// Function called before the exit of either reducer or side effects
// ============================================
function beforeReturn(label, input, logIndex){
  log(label, input, logIndex)
  // if (CAN_LOG) log(label, input, logIndex)

  return input
}

// Let local reducers change their local store
// ============================================
function applyReducer(tag, reducer, state, action){
  if (!action.type.startsWith(`${ tag }@`)) return false

  const reducerResult = reducer(
    state[ `${ tag }Store` ],
    action
  )
  reducerLog(action, reducerResult)

  return {
    ...state,
    [ `${ tag }Store` ] : reducerResult,
  }
}

// It allows to pass reducers as [{fooReducer},{barReducer}]
// ============================================
function parse(allReducersRaw){
  const allTags = []
  const allReducers = allReducersRaw.map(singleReducerRaw => {
    const { prop: tagRaw, value: reducer } = headObject(singleReducerRaw)
    const tag = remove('Reducer', tagRaw)
    allTags.push(tag)

    return {
      tag,
      reducer,
    }
  })

  return {
    allReducers,
    allTags,
  }
}

// Substitute for React-router
// ============================================
function routeChange(allTags, state, action){
  const [ currentTag ] = action.type.split('@')
  const [ activeTag ] = allTags.filter(tag => state[ `${ tag }Store` ].ready)
  if (activeTag === currentTag) return state

  const currentInputs = takeArguments(window.location.href)
  let newRoute = `?route=${ currentTag }`
  Object.keys(currentInputs).forEach(
    prop => {
      if (prop === 'route') return
      newRoute += `?${ prop }=${ currentInputs[ prop ] }`
    }
  )
  history.pushState({}, '', newRoute)

  if (!activeTag){

    return {
      ...state,
      [ `${ currentTag }Store` ] : {
        ...state[ `${ currentTag }Store` ],
        ready : true,
      },
    }
  }

  return {
    ...state,
    [ `${ activeTag }Store` ] : {
      ...state[ `${ activeTag }Store` ],
      ready : false,
    },
    [ `${ currentTag }Store` ] : {
      ...state[ `${ currentTag }Store` ],
      ready : true,
    },
  }
}

/*
  Side effects can:
  1. refuse to change the state at the end(mostly because they already did that with dispatch)
  2. return action, which replaces starter action of the side effect
  3. return new state(this is relatively safe as `sideEffects` is using `getState`)
*/
function applySideEffectsBee(actionOrState){
  /*
    Important
    This allows async side effects
    as in the common case they will end with no change of state
    because they have already dispatched actions(just like `sagas`)
  */
  if (actionOrState === false){
    return beforeReturn('SIDE.EFFECT', {})
  }

  const exportedProp = isAction(actionOrState) ?
    'newAction' :
    'newState'

  return beforeReturn(
    'SIDE.EFFECT.X',
    { [ exportedProp ] : actionOrState },
  )
}

// This function allows side effects to be asynchronous
// ============================================
function applySideEffects(state, action, sideEffects, getState, onError){
  if (sideEffects[ action.type ]){
    const actionOrState = sideEffects[ action.type ](
      state,
      action,
      getState
    )
    if (!isPromise(actionOrState)) return applySideEffectsBee(actionOrState)

    actionOrState
      .then(actionOrStateResolved => applySideEffectsBee(actionOrStateResolved))
      .catch(e => {
        log('side effect error', {
          action,
          e,
        })
        onError(e)
      })
  }

  return {}
}

// Down the rabbit hole leads to the rabbit
// ============================================
function rabbit({
  allTags,
  allReducers,
  rootReducer,
  newState,
  newAction,
  actionRaw,
  state,
}){
  if (newState){
    return beforeReturn(`SIDE.EFFECT - ${ action.type }`, newState)
  }

  const action = newAction ? newAction : actionRaw

  if (isRouterAction(action)){
    return beforeReturn('ROUTE.CHANGE', routeChange(allTags, state, action))
  }

  for (const reducer of allReducers){
    const maybeNewState = applyReducer(
      reducer.tag,
      reducer.reducer,
      state,
      action,
    )
    if (maybeNewState){
      return beforeReturn(
        `NEW.STATE - ${ action.type }`,
        maybeNewState,
        NEW_STATE_LOG_INDEX
      )
    }
  }

  return beforeReturn('ROOT', rootReducer(state, action))
}

/*
  Function called once from the `src/index.jsx` file
  This file needs to declare `getState` function

  let currentState
  function getCurrentState(){
    return currentState ?
      currentState :
      initialState
  }
  function setCurrentState(newState){
    currentState = newState
  }

  ...
  // inside root component
  const [ store, dispatch ] = useReducer(
    reducer,
    getCurrentState()
  )
  setCurrentState(store)
*/
function createReducer(rootReducer, allReducersRaw, getState, sideEffects = {}, onError = () => {}){
  const { allTags, allReducers } = parse(allReducersRaw)

  return (_, actionRaw) => {
    const state = getState()
    reduxLog(actionRaw)
    const sideEffectsResult = applySideEffects(state, actionRaw, sideEffects, getState, onError)

    if (!isPromise(sideEffectsResult)){
      const { newAction, newState } = sideEffectsResult

      return rabbit({
        allTags,
        allReducers,
        rootReducer,
        newState,
        newAction,
        actionRaw,
        state,
      })
    }

    return sideEffectsResult
      .then(resolved => rabbit({
        allTags,
        allReducers,
        rootReducer,
        newState  : resolved.newState,
        newAction : resolved.newAction,
        actionRaw,
        state     : getState(),
      }))
      .catch(onError)
      // .catch(e => beforeReturn(`error ${ actionRaw.type }`, { state }))
  }
}

/*
  Substitute for Styled-components
  It also attaches props to the returned element

  Supported elements are input, img, span and div
*/
function styled(className, optionsAndProps = {}){
  return ({ children }) => {
    if (Object.keys(optionsAndProps).length === 0){
      return <div className={ className }>{children}</div>
    }
    const props = omit('input,span,img', optionsAndProps)
    if (optionsAndProps.span){
      return <span 
        className={ className } 
        {...props}
      >{children}</span>
    }
    if (optionsAndProps.input){
      return <input 
        className={ className } 
        {...props}
      />
    }
    if (optionsAndProps.img){
      return <input 
        className={ className } 
        {...props}
      />
    }

    return <div className={ className } { ...optionsAndProps }>{children}</div>
  }
}

// Used to declare the individual pieces(components) of the project
// ============================================
function wrapper(store, dispatch){
  return componentRaw => {
    const { prop: tagRaw, value: Component } = headObject(componentRaw)
    const tag = `${ head(tagRaw).toLowerCase() }${ tail(tagRaw) }`
    if (!path(`${ tag }Store.ready`, store)) return ''

    return <Component 
      dispatch={ dispatch } 
      store={ store[`${tag}Store`] } 
    />
  }
}

// It generates side effect which is activated after both actions has beed dispatched
// ============================================
function producePair([ first, second ], holder){
  return {
    [ first.action ] : (state, action) => {
      if (holder[ second.label ]){
        return holder.fn(state, [ action, holder[ second.label ] ])
      }
      holder[ first.label ] = action

      return false
    },
    [ second.action ] : (state, action) => {
      if (holder[ first.label ]){
        return holder.fn(state, [ holder[ first.label ], action ])
      }
      holder[ second.label ] = action

      return false
    },
  }
}

// It allows dispatch of actions
// ============================================
let dispatchHolder
function dispatcher(input){
  console.log({ input })
  if (typeof input === 'function'){
    return dispatchHolder = input
  }
  if (!dispatchHolder){
    return console.log('thunk is not set')
  }
  dispatchHolder(input)
}

/*
const componentDidMount = once(componentDidMountRaw)

called in render method as `componentDidMount(dispatch)`
*/
const componentDidMountRaw = dispatch => {
  console.log('component did mount')
  dispatcher(dispatch)
  const { route } = takeArguments(window.location.href)
  if (route) dispatch({ type : `${ route }@ROUTE_CHANGE` })
}

let currentState
function getCurrentState(initialState){
  return currentState ?
    currentState :
    initialState
}
function setCurrentState(newState){
  console.log({ newState })
  currentState = newState
}

// Helper to dispatch action that only waits for payload
// ============================================
const dispatchAction = actionType => payload => dispatcher({
  type : actionType,
  payload,
})

// Helper to dispatch action with payload of syntetic event's path
// ============================================
const dispatchEvent = (actionType, eventPath) => synteticEvent => dispatcher({
  type    : actionType,
  payload : eventPath ?
    path(eventPath, synteticEvent) :
    undefined,
})

exports.colorLog = colorLog
exports.log = log

exports.getCurrentState = getCurrentState
exports.setCurrentState = setCurrentState

exports.componentDidMountRaw = componentDidMountRaw
exports.createReducer = createReducer
exports.producePair = producePair
exports.styled = styled
exports.wrapper = wrapper

exports.dispatchAction = dispatchAction
exports.dispatchEvent = dispatchEvent
exports.dispatcher = dispatcher
