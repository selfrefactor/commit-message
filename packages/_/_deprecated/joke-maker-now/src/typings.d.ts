// ROOT
interface Store {
  password: string
  words: string[]
  seeds: string[]
  status: string
}

interface InitialState {
  store: Store
}

interface BaseProps {
  dispatch: any
}

interface Props extends BaseProps {
  store: Store
}

type GetState = () => ({
  store?: Store,
})

interface ObservableStore {
  getState: GetState
}
// INJECT_COMPONENT_MARKER

// ACTION_INTERFACES
interface FetchReadyAction { type: FETCH_READY, payload: any }
interface FetchAction { type: FETCH }
interface InitAction { type: INIT }

// COMMON
interface GetNextIndex {
  length: number
  index: number
}

// DEV
interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
  __REDUX_DEVTOOLS_EXTENSION__: any
}

interface Action {
  type: string
  payload?: any
}
// CONSTANTS
type FETCH_READY = 'FETCH_READY'
type FETCH = 'FETCH'
type INIT = 'INIT'
