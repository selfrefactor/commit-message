const initialState = 0

export const reducer = (state = initialState, action) => {
  switch (action.type){
  case 'INCREMENT':
    return state + action.payload

  default:
    return state
  }
}
