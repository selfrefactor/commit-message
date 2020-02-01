export const createReducer = (x: CreateReducer) => {
  const keys = Object.keys(x.reactions)
  const store = (state = x.initialState, action) => {
    if (keys.includes(action.type)) {

      return x.reactions[action.type](state, action)
    }

    return state
  }

  return store
}
