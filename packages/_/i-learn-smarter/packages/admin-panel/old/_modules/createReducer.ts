export const createReducer = (x: CreateReducer) => {
  const store = (state = x.initialState, action) => {
    if (Object.keys(x.reactions).includes(action.type)) {

      return x.reactions[action.type](state, action)
    }

    return state
  }

  return store
}
