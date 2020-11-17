export interface SearchImageResult{
  height: number
  imageSrc: string
  thumbSrc: string
  width: number
}

interface Foo {
  a: number
  b: string
  c: string[]
  d?: string
}

interface Bar {
  x: boolean
  y: string
  z: boolean[]
}

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