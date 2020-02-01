import React from 'react'
import { takeArguments } from 'string-fn'
import {
  head,
  isPromise,
  isType,
  headObject,
  omit,
  path,
  random,
  once,
  setter,
  tail,
} from 'rambdax'
import { log } from './log'
import { logString, colorLog } from './colorLog'

// Helper that defines what action is
// ============================================
function isAction(maybeAction){
  if (!isType('Object', maybeAction)) return false

  return typeof maybeAction.type === 'string'
}

// Logging helper for reducers
// ============================================
function reducerLog(action, result){
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
  const logIndex = random(0, 5)
  if (action.payload === undefined){
    return colorLog(logIndex, `START - ${ action.type }`)
  }

  return colorLog(logIndex, `START - ${ action.type }`, action.payload)
}

// Function called before the exit of either reducer or side effects
// ============================================
function beforeReturn(label, input, logIndex){
  log(label, input, logIndex)

  return input
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

function rabbit({
  rootReducer,
  newState,
  newAction,
  actionRaw,
  state,
}){
  if (newState){
    return beforeReturn('SIDE.EFFECT', newState)
  }
  const action = newAction ? newAction : actionRaw
  const stateToBe = rootReducer(state, action)
  reducerLog(action, stateToBe)

  return stateToBe
}

/*

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

const defaultOptions = {
  onError: () => {},
  logFlag: true,
}

export function createReducer(rootReducer, getState, sideEffects = {}, options = {}){
  const inputOptions = {
    ...defaultOptions,
    ...options,
  }
  setter('REDUXED_OPTIONS', inputOptions)

  return (_, actionRaw) => {
    const state = getState()
    reduxLog(actionRaw)
    const sideEffectsResult = applySideEffects(state, actionRaw, sideEffects, getState, inputOptions.onError)

    if (!isPromise(sideEffectsResult)){
      const { newAction, newState } = sideEffectsResult

      return rabbit({
        rootReducer,
        newState,
        newAction,
        actionRaw,
        state,
      })
    }

    return sideEffectsResult
      .then(resolved => rabbit({
        rootReducer,
        newState  : resolved.newState,
        newAction : resolved.newAction,
        actionRaw,
        state     : getState(),
      }))
      .catch(inputOptions.onError)
  }
}

/*
  Substitute for Styled-components
  It also attaches props to the returned element

  Supported elements are input, img, span and div
*/
export function styled(className, optionsAndProps = {}){
  return ({ children }) => {
    if (Object.keys(optionsAndProps).length === 0){
      return <div className={ className }>{children}</div>
    }
    const props = omit('input,span,img', optionsAndProps)
    if (optionsAndProps.span){
      return (<span
        className={ className }
        {...props}
              >{children}</span>)
    }
    if (optionsAndProps.input){
      return (<input
        className={ className }
        {...props}
              />)
    }
    if (optionsAndProps.img){
      return (<input
        className={ className }
        {...props}
              />)
    }

    return <div className={ className } { ...optionsAndProps }>{children}</div>
  }
}

// It allows dispatch of actions
// ============================================
let dispatchHolder
export function dispatcher(input){
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
export const componentDidMountRaw = dispatch => {
  logString('component did mount')
  dispatcher(dispatch)
}

let currentState
export function getCurrentState(initialState){
  return currentState ?
    currentState :
    initialState
}
export function setCurrentState(newState){
  currentState = newState
}

// Helper to dispatch action that only waits for payload
// ============================================
export const dispatchAction = actionType => payload => dispatcher({
  type : actionType,
  payload,
})

export const dispatchEvent = (actionType, eventPath) => synteticEvent => dispatcher({
  type    : actionType,
  payload : eventPath ?
    path(eventPath, synteticEvent) :
    undefined,
})

export const componentDidMount = once(componentDidMountRaw)
