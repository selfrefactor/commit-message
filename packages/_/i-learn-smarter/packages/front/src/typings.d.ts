type NotifyType = 'notify@SUCCESS' |
  'notify@WARNING' |
  'notify@LOADING' |
  'notify@INFO' |
  'notify@ERROR'

interface NotifyInput {
  type: NotifyType
  payload: {
    message?: string
    ms?: number,
  }
}

// ACTION_INTERFACES
interface WriteSentenceMicAction { type: WRITE_SENTENCE_MIC, payload: string }
interface LessonNextAction { type: LESSON_NEXT, payload?: any }
interface LessonClickAction { type: LESSON_CLICK, payload?: any }
interface LessonInitReadyAction { type: LESSON_INIT_READY, payload?: any }
interface LessonInitAction { type: LESSON_INIT, payload?: any }
interface SelectArticleCheckAction { type: SELECT_ARTICLE_CHECK, payload?: any }
interface SelectArticleStopAction { type: SELECT_ARTICLE_STOP, payload?: any }
interface SelectArticleClickAction {
  type: SELECT_ARTICLE_CLICK
  payload: {
    article: SelectableArticle
    word: string,
  }
}
interface SelectArticleNextAction { type: SELECT_ARTICLE_NEXT, payload?: any }
interface SelectArticleInitReadyAction { type: SELECT_ARTICLE_INIT_READY, payload?: any }
interface SelectArticleInitAction { type: SELECT_ARTICLE_INIT | INIT_READY }
interface InfoAction { type: INFO, payload?: any }
interface GuessWordCheckAction { type: GUESS_WORD_CHECK, payload?: any }
interface GuessWordInitAction { type: GUESS_WORD_INIT | INIT_READY }
interface GuessWordInitReadyAction { type: GUESS_WORD_INIT_READY }
interface GuessWordInputAction { type: GUESS_WORD_INPUT, payload: any }
interface GuessWordNextAction { type: GUESS_WORD_NEXT }

interface WriteSentenceListenAction {
  type: WRITE_SENTENCE_LISTEN,
  payload: any
}
interface WriteSentenceInitAction { type: WRITE_SENTENCE_INIT | INIT_READY }
interface WriteSentenceInitReadyAction { type: WRITE_SENTENCE_INIT_READY }
interface WriteSentenceNextAction { type: WRITE_SENTENCE_NEXT }
interface WriteSentenceCheckAction { type: WRITE_SENTENCE_CHECK }
interface WriteSentenceStepAction { type: WRITE_SENTENCE_STEP }

interface LearningMemeInitAction { type: LEARNING_MEME_INIT | INIT_READY }
interface LearningMemeInitReadyAction { type: LEARNING_MEME_INIT_READY }
interface LearningMemeNextAction { type: LEARNING_MEME_NEXT }
interface LearningMemeListenAction { type: LEARNING_MEME_LISTEN, payload: any }
interface LearningMemeCheckAction { type: LEARNING_MEME_CHECK, payload: string }
interface LearningMemeStopAction { type: LEARNING_MEME_STOP }
interface LearningMemeSpeechInputAction {
  type: LEARNING_MEME_NEXT | LEARNING_MEME_STOP
}

interface ChooseWordClickAction { type: CHOOSE_WORD_CLICK, payload?: any }
interface ChooseWordCheckAction { type: CHOOSE_WORD_CHECK }
interface ChooseWordInitAction { type: CHOOSE_WORD_INIT | INIT_READY }
interface ChooseWordInitReadyAction { type: CHOOSE_WORD_INIT_READY }
interface ChooseWordNextReadyAction { type: CHOOSE_WORD_NEXT_READY }
interface ChooseWordNextAction { type: CHOOSE_WORD_NEXT }
interface ChooseWordStepAction { type: CHOOSE_WORD_STEP }
interface ChooseWordStopAction { type: CHOOSE_WORD_STOP }

interface GeneralAction { type: GeneralTypes }

interface SharedAddPointsAction { type: SHARED_ADD_POINTS, payload?: any }
interface SharedSpeakAction { type: SHARED_SPEAK, payload: 'fromPart' | 'toPart' }

type Settings = SETTINGS_TEXT_TO_SPEECH | SETTINGS_RANDOM
interface SharedChangeSettingsAction { type: Settings }

interface InitAction { type: 'INIT' }
interface InitReadyAction { type: INIT_READY, payload: any }

// TYPES
////////////
type GeneralTypes = LANGUAGE_CHANGE |
  LANGUAGE_CHANGE_CLICK |
  ROUTER_CHANGE |
  LEARNING_MEME_INIT |
  LESSON_INIT |
  SELECT_ARTICLE_INIT |
  CHOOSE_WORD_INIT |
  GUESS_WORD_INIT |
  WRITE_SENTENCE_INIT

type Language = 'EN' | 'DE' | 'BG'
type Delay = (ms: number) => Promise<string>
type SetDB = (input: Store) => Promise<DBInstance[]>

// ROOT
interface DBInstance {
  altTag?: string
  bgPart?: string
  bgWord?: string
  bgRelated?: string[]
  dePart: string
  deWord: string
  deRelated?: string[]
  enPart: string
  enWord: string
  enRelated?: string[]
  imageSrc?: string | false
  imageSrcOrigin?: string
}

interface RoughData {
  [namespace: string]: {
    roughness?: number
    fill?: string
    fillWeight?: number
    active?: boolean,
  }
}

interface DefaultState {
  fromLanguage: Language
  points: number
  textToSpeechFlag: boolean
  toLanguage: Language
}

interface Store extends DefaultState {
  db?: DBInstance[]
  instructions: string
  logged: boolean
  name: string
  ready: boolean
  navigationActive: boolean
  roughData: RoughData
  toggleLanguage: boolean
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

// WRITE_SENTENCE
interface WriteSentenceQuestion {
  visible: string
  hidden: string
}

interface WriteSentenceStore {
  currentIndex?: number
  currentInstance?: DataPattern
  convertedImage?: string | false
  db?: DataPattern[]
  index?: number
  inputState?: string
  listen?: boolean
  question?: WriteSentenceQuestion[]
  ready: boolean
  okCorrect?: (null | boolean)[]
  easyMode?: boolean
}

interface WriteSentenceProps extends BaseProps {
  writeSentenceStore: WriteSentenceStore
}

// LEARNING_MEME
interface LearningMemeStore {
  ready: boolean
  convertedImage: string | false
  db?: DataPattern[]
  currentInstance?: DataPattern
  question: string
  currentIndex: number
  listen: boolean
  inputState: string
  sentence: {
    hidden: string
    visible: string,
  }
}

interface LearningMemeProps extends BaseProps {
  learningMemeStore: LearningMemeStore
}

// CHOOSE_WORD
interface ChooseWordStore {
  correctAnswer: string[]
  currentIndex: number
  currentInstance?: DataPattern
  db?: DataPattern[]
  fillerWords?: Fillers
  index: number
  localPoints: number
  listen: boolean
  question: string[][]
  ready: boolean
}

interface ChooseWordProps extends BaseProps {
  chooseWordStore: ChooseWordStore
}
// INJECT_COMPONENT
// LESSON
interface LessonStore {
  ready: boolean
  showQuestion: boolean
  question?: (LessonQuestion[] | string)[]
  isExample: boolean
  currentIndex: number
  currentStep: any
  steps: any[]
}

interface LessonQuestion {
  text: string
  correct: string
  status: string
}

interface LessonProps extends BaseProps {
  lessonStore: LessonStore
}
// SELECT_ARTICLE
interface SelectArticleStore {
  ready: boolean
  listen: boolean
  currentIndex: number
  db: DBInstance[]
  currentInstance: {
    wordList: ArticleWordList
    imageSrc: string
    fromPart: string
    toPart: string,
  }
}

interface SelectArticleProps extends BaseProps {
  selectArticleStore: SelectArticleStore
  store: Store
}

interface ArticleSet {
  status: string
  value: string
}

interface SelectableArticle {
  solved: boolean
  correct: string
  articleSet: ArticleSet[]
  index: number
}

type ArticleWordList = (string | SelectableArticle)[]

// GUESS_WORD
interface GuessWordStore {
  answer: string
  currentIndex: number
  currentInstance?: DataPattern
  db: DBInstance[]
  inputState: string
  listen: boolean
  question: string
  ready: boolean
  related: string[]
  translated: string
  wordQuestion: string
  wordAnswer: string
}

interface GuessWordProps extends BaseProps {
  guessWordStore: GuessWordStore
  store: Store
}

// OTHER
////////////
interface FractionGetters {
  getFraction(fraction: number): number
  getSubFraction(child: number, parrent: number): number
}

interface Fillers {
  [index: number]: string[]
}

type Dispatch = (input: any) => Action

type GetState = () => ({
  learningMemeStore: LearningMemeStore
  writeSentenceStore: WriteSentenceStore
  chooseWordStore: ChooseWordStore
  lessonStore: LessonStore
  selectArticleStore: SelectArticleStore
  guessWordStore: GuessWordStore
  store: Store,
})

interface ObservableStore {
  getState: GetState
}

interface GetDB {
  fromLanguage: string
  toLanguage: string
  db: DBInstance[]
}

interface DataPattern {
  imageSrc: string
  fromWord: string
  toWord: string
  fromPart: string
  toPart: string
}

interface GetNextIndex {
  length: number
  index: number
}

interface Action {
  type: string
  payload?: any
}

type PostRequest = (url: string, body: object) => Promise<Response>
type GetRequest = (url: string) => Promise<Response>
// GLOBAL
////////////
declare var webkitSpeechRecognition: any

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
  __REDUX_DEVTOOLS_EXTENSION__: any
  webkitSpeechRecognition: any
  requestIdleCallback: any
}

// CONSTANTS
type LESSON_NEXT = 'lesson@NEXT'
type LESSON_CLICK = 'lesson@CLICK'
type LESSON_INIT_READY = 'lesson@INIT_READY'
type LESSON_INIT = 'lesson@INIT'
type SELECT_ARTICLE_CHECK = 'selectArticle@CHECK'
type SELECT_ARTICLE_STOP = 'selectArticle@STOP'
type SELECT_ARTICLE_CLICK = 'selectArticle@CLICK'
type SELECT_ARTICLE_NEXT = 'selectArticle@NEXT'
type SELECT_ARTICLE_INIT_READY = 'selectArticle@INIT_READY'
type SELECT_ARTICLE_INIT = 'selectArticle@INIT'
type GUESS_WORD_INIT_READY = 'guessWord@INIT_READY'
type GUESS_WORD_NEXT = 'guessWord@NEXT'
type GUESS_WORD_CHECK = 'guessWord@CHECK'
type GUESS_WORD_INIT = 'guessWord@INIT'
type GUESS_WORD_INPUT = 'guessWord@INPUT'

type LANGUAGE_CHANGE = 'languageChange'
type LANGUAGE_CHANGE_CLICK = 'languageChange@CLICK'

type INFO = 'INFO'
type INIT_READY = 'INIT_READY'

type SHARED_ADD_POINTS = 'shared@ADD_POINTS'
type SHARED_INIT = 'shared@INIT'
type SHARED_SHOW_ANSWER = 'shared@SHOW_ANSWER'
type SHARED_SPEAK = 'shared@SPEAK'

type SETTINGS_RANDOM = 'settings@RANDOM'
type SETTINGS_TEXT_TO_SPEECH = 'settings@TEXT_TO_SPEECH'

type WRITE_SENTENCE_LISTEN = 'writeSentence@LISTEN'
type WRITE_SENTENCE_MIC = 'writeSentence@MIC'
type WRITE_SENTENCE_INIT = 'writeSentence@INIT'
type WRITE_SENTENCE_INIT_READY = 'writeSentence@INIT_READY'
type WRITE_SENTENCE_NEXT = 'writeSentence@NEXT'
type WRITE_SENTENCE_CHECK = 'writeSentence@CHECK'
type WRITE_SENTENCE_STEP = 'writeSentence@STEP'

type CHOOSE_WORD_CHECK = 'chooseWord@CHECK'
type CHOOSE_WORD_INIT = 'chooseWord@INIT'
type CHOOSE_WORD_CLICK = 'chooseWord@CLICK'
type CHOOSE_WORD_NEXT = 'chooseWord@NEXT'
type CHOOSE_WORD_NEXT_READY = 'chooseWord@NEXT_READY'
type CHOOSE_WORD_STEP = 'chooseWord@STEP'
type CHOOSE_WORD_STOP = 'chooseWord@STOP'
type CHOOSE_WORD_INIT_READY = 'chooseWord@INIT_READY'

type LEARNING_MEME_INIT = 'learningMeme@INIT'
type LEARNING_MEME_INIT_READY = 'learningMeme@INIT_READY'
type LEARNING_MEME_NEXT = 'learningMeme@NEXT'
type LEARNING_MEME_LISTEN = 'learningMeme@LISTEN'
type LEARNING_MEME_CHECK = 'learningMeme@CHECK'
type LEARNING_MEME_STOP = 'learningMeme@STOP'

type ROUTER_CHANGE = '@@router/LOCATION_CHANGE'
