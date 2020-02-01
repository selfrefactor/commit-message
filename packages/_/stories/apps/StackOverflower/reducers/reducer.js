import { nextIndex } from 'rambdax'
const initialState = {
  data            : [ ],
  // data            : [ { a : 1 }, { a : 3 }, { a : 4 }, { a : 5 }, { a : 14 }, { a : 1443 } ],
  currentIndex    : -1,
  ready           : false,
  recentlyClicked : true,
}

function withProps(state, action, props){
  const holder = { ...state }
  props.forEach(prop => {
    holder[ prop ] = action.payload[ prop ]
  })

  return holder
}

export const reducer = (state = initialState, action) => {
  switch (action.type){
  case 'SET_FROM_INTERVAL':
    return {
      ...state,
      recentlyClicked : false,
    }
  case 'NEXT':
    return {
      ...state,
      ...action.payload ? action.payload : {},
      currentIndex : nextIndex(state.currentIndex, state.data),
    }
  case 'SET_RECENTLY_CLICKED':
    return withProps(state, action, [ 'recentlyClicked' ])
  case 'INIT_READY':
    return {
      ...state,
      ready        : true,
      currentIndex : 0,
      data         : action.payload ? action.payload.data : [],
    }

  default:
    return state
  }
}
