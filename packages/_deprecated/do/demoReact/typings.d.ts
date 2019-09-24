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
  // GET_STATE
  store?: Store,
})

interface ObservableStore {
  getState: GetState
}
// INJECT_COMPONENT
// FOO
interface FooStore {
  a: number
}

interface FooProps extends BaseProps{
  fooStore: FooStore
  store: Store
}
// SELVREFACTOR
interface SelvrefactorStore {
  a: number
}

interface SelvrefactorProps extends BaseProps{
  fooStore: SelvrefactorStore
  store: Store
}

// ACTION_INTERFACES
interface SelvrefactorInitAction { type: SELVREFACTOR_INIT, payload?: any }
interface FooInitAction { type: FOO_INIT, payload?: any }
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
type SELVREFACTOR_INIT = 'selvrefactor@INIT'
type FOO_INIT = 'foo@INIT'