const initialState = {
  "a": 1
}
  
export function selfrefactorStore(
  state: SelfrafactorStore = initialState,
  action: Action,
): SelfrafactorStore {

  switch (action.type) {
    // STORE_SWITCH
    default:
      return state
  }
}