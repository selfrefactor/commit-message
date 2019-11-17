// ROOT
interface Store {
  navigationActive: boolean
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
// MAIN
interface MainUploadReadyAction { type: MAIN_UPLOAD_READY, payload?: any }
interface MainInitAction { type: MAIN_INIT, payload?: any }

interface MainStore {
  ready: boolean,
  notary: string
}

interface MainProps extends BaseProps {
  mainStore: MainStore
}

// ACTION_INTERFACES
interface InitAction { type: 'INIT', payload?: any }

interface ToggleAction { type: 'TOGGLE' }

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
type MAIN_UPLOAD_READY = 'MAIN_UPLOAD_READY'
type MAIN_INIT = 'MAIN_INIT'
