interface Window { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any }

interface ReduxAction {
  type: string
  payload?: any
}

interface Props {
  dispatch(input: ReduxAction): void
}

interface AdminInsertStore {
  loaded: boolean
  allKeys: string[]
  currentInstanceKeys: string[]
  currentInstance: any[]
}

interface AdminInsertProps extends Props {
  adminInsertStore: AdminInsertStore
}

interface AdminInsertProps extends Props {
  adminInsertStore: AdminInsertStore
}

interface SingleInsertStore {
  dePart: string
  enPart: string
  bgPart: string
  deWord: string
  enWord: string
  bgWord: string
}

interface SingleInsertProps extends Props {
  singleInsertStore: SingleInsertStore
}

type Mode = 'IMAGEFULL' | 'IMAGELESS' | 'RELATED'

interface AdminRepairStore {
  currentIndex: number
  currentInstance: any
  data: any[]
  relatedMode: string
  hoverTranslation: string
  related: {
    bg: string[]
    bgIndex: number
    de: string[]
    deIndex: number
    en: string[]
    enIndex: number,
  }
  mode: Mode
  randomFlag: boolean
  images: any[]
  loaded: boolean
  showImages: boolean
}

interface AdminRepairProps extends Props {
  adminRepairStore: AdminRepairStore
}

interface Related extends AdminRepairProps {
  mode: string
}

interface RelatedCell extends Related {
  x: string
}

interface CreateReducer {
  initialState: object,
  reactions: object
}

interface InitialState {
  logged: boolean
  password: boolean
}

interface MainProps extends Props {
  store: InitialState
}

interface InitSyncInput {
  dbName: string
  dbNameDraft: string
}

interface KeyEvent extends KeyboardEvent {
  path: any[]
}

interface Action {
  type: string
  payload?: any
}
