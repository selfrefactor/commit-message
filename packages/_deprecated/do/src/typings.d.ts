interface DoModule {
  mode: 'NODE' | 'REACT' | 'ALL'
  srcDirectory: string
  packageJson?: string
  vscode?: boolean
}

interface ParseFilePath {
  fileName: string
  folderPath: string
}

interface CreateModuleFile {
  typeExport: boolean
  fileName: string
  folderPath: string
  inputArguments: string
  rootInput: DoModule
  selectedMode: string
}

interface CreateTestFile {
  typeExport: boolean
  expectedResult: any
  fileName: string
  folderPath: string
  rootInput: DoModule
  selectedMode: string
  inputArguments: string
  testInput: any
}

interface AskTemplate {
  info?: string
  key: string
  question: string
}

interface AskListTemplate extends AskTemplate {
  choices: string[]
}

interface AskStoreOutput {
  initialState: object
  interfaceProps: string[]
}

interface ComponentAskUser {
  firstEpic: string
  name: string
  storeType: string
  firstEpicStarter: string
  store?: AskStoreOutput
}

interface ComponentInput extends ComponentAskUser {
  rootInput: DoModule
  actionsLocation: string
  combinedReducersLocation: string
  componentLocation: string
  constantsLocation: string
  epicLocation: string
  folderName: string
  indexEpicLocation: string
  indexTsxLocation: string
  reducersLocation: string
  rootEpicLocation: string
  storeName: string
  storeTyping: string
  typingsLocation: string
}

type ExtendedComponentInput = ComponentInput & ComponentCreatedEpic

interface ComponentCreatedEpic {
  constantKey: string
  constantValue: string
}

interface EpicAskUser {
  folder: string
  name: string
  starterAction: string
}

interface EpicBasicInput extends EpicAskUser {
  rootInput: DoModule
  allComponents: string[]
  actionsLocation: string
  constantsLocation: string
  epicLocation: string
  indexEpicLocation: string
  typingsLocation: string
}
interface EpicCreatedEpic {
  actionName: string
  constantName: string
  constantValue: string
  epicName: string
  isLocal: boolean
}

type EpicInput = EpicBasicInput & EpicCreatedEpic

interface CheckFile {
  location: string
  markers: string[]
  key?: string
}

interface CheckFiles {
  indexTsx: CheckFile
  constants: CheckFile
  combinedReducers: CheckFile
  rootEpic: CheckFile
  typings: CheckFile
}

interface ComponentFiles {
  actions: CheckFile
  component: CheckFile
  reducers: CheckFile
  indexEpic: CheckFile
}
