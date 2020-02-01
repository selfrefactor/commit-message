import { playBee } from '../bees/play'
import { updateDbBee } from '../bees/updateDb'
import React, { useReducer } from 'react'
import { nextIndex, once } from 'rambdax'
import { takeArguments } from 'string-fn'
import { parseUrlInputsBee } from '../bees/parseUrlInputs'
import { Grid, Cell } from '../../src/Grid/component'
import { VideoStretched } from '../../src/VideoStretched/component'
import { ImageStretched } from '../../src/ImageStretched/component'
import {
  getCurrentState,
  setCurrentState,
  createReducer,
  dispatchEvent,
  componentDidMountRaw,
} from '../../libs/reduxed/index.js'

const {
  subreddit,
  play,
  specialMode,
} = parseUrlInputsBee(
  takeArguments(
    window.location.href,
    undefined,
    true
  )
)
document.title = subreddit

const initialState = {
  db      : [],
  index   : 0,
  marker  : undefined,
  loading : false,
  play,
  subreddit,
}

function incIndexAnt(state){
  const index = nextIndex(state.index, state.db)
  const isGif = state.db[ index ].type === 'gif'

  return {
    ...state,
    index,
    loading : isGif,
  }
}

function rootReducer(state, action){
  switch (action.type){
  case 'SET_DB':
    return {
      ...state,
      marker : action.payload.marker,
      db     : [ ...state.db, ...action.payload.db ],
    }
  case 'GIF_READY':
    return {
      ...state,
      loading : false,
    }
  case 'INC_INDEX':
    return incIndexAnt(state)
  default:
    return state
  }
}

const reducer = createReducer(
  rootReducer,
  getCurrentState,
  {},
  { logFlag: false }
)

const componentDidMount = once(async dispatch => {
  componentDidMountRaw(dispatch)
  await updateDbBee(subreddit)
  playBee(getCurrentState)
})

let Holder
let prevStore

function allowRenderBee(prevStore, store){
  if (store.index !== prevStore.index) return true

  return false
}

function shouldRender(store){
  if (prevStore === undefined){
    prevStore = store

    return false
  }
  const result = allowRenderBee(prevStore, store)
  prevStore = store

  return result
}

export function RedditViewer(){
  const [ store, dispatch ] = useReducer(
    reducer,
    getCurrentState(initialState)
  )
  setCurrentState(store)
  componentDidMount(dispatch)
  if (store.db.length === 0) return null

  const currentInstance = store.db[ store.index ]
  const isImage = !specialMode && currentInstance.type === 'image'
  const isGif = !specialMode && currentInstance.type === 'gif'
  const isVideo = !specialMode && currentInstance.type === 'video'
  if (shouldRender(store) || Holder === undefined){
    Holder =
      (<Grid>
        <Cell
          height={ 32 }
          topLeft={ {
            x : 0,
            y : 0,
          } }
          width={ 32 }
        >
          {isImage && (
            <ImageStretched src={currentInstance.src} />
          )}

          {isGif && (
            <ImageStretched
              callback={dispatchEvent('GIF_READY')}
              src={currentInstance.src}
            />
          )}

          {isVideo && (
            <VideoStretched {...currentInstance} />
          )}
        </Cell>
      </Grid>)

  }

  return Holder
}
