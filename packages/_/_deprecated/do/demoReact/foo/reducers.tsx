const initialState = {
  "a": 1
}
  
export function fooStore(
  state: FooStore = initialState,
  action: Action,
): FooStore {

  switch (action.type) {
    // STORE_SWITCH
    default:
      return state
  }
}