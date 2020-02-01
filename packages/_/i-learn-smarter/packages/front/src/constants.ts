import { DARK_BLUE_3, PINK_0 } from 'colors'
import { createActionAnt } from './ants/createAction'
import { glue, remove } from 'rambdax'

// These keys persist
// ============================================
export const initialDefaultState = {
  randomFlag: false,
  textToSpeechFlag: false,
}
export const defaultState: DefaultState = {
  textToSpeechFlag: false,
  points: 0,
  fromLanguage: 'DE',
  toLanguage: 'EN',
}
export const urlInputsDefault = {
  easy: false,
  visible: false,
  easier: false,
  easiest: false,
  random: false,
}
export const allowedUrlInputs = glue(`
  id
  fromLanguage
  toLanguage
  lock
  mic,visible
  reset
  window
  auto,pause
  big,small
  child,adult,
  easy,easier,easiest,random
`, ',')

// Place keys that don't need reset:
//
// child because it is set only once
// id because is needed for rehydrate
// window because it needs to be kept for further use
// ============================================
const PERSISTED_KEYS = [
  'child', 
  'fromLanguage',
  'id',
  'toLanguage',
  'window', 
].map(x => `${x},`)
export const resetUrlInputs = remove(
  PERSISTED_KEYS,
  allowedUrlInputs,
)

// INJECT_COMPONENT
// LESSON
export const LESSON_CLICK = 'lesson@CLICK'
export const LESSON_SELECT = 'lesson@SELECT'
export const LESSON_NEXT = 'lesson@NEXT'
export const LESSON_QUESTION_READY = 'lesson@QUESTION_READY'
export const LESSON_INIT_READY = 'lesson@INIT_READY'
export const LESSON_INIT = 'lesson@INIT'
// SELECT_ARTICLE
export const SELECT_ARTICLE = 'selectArticle'
export const SELECT_ARTICLE_SHOW = 'selectArticle@SHOW'
export const SELECT_ARTICLE_STOP = 'selectArticle@STOP'
export const SELECT_ARTICLE_CHECK = 'selectArticle@CHECK'
export const SELECT_ARTICLE_CLICK = 'selectArticle@CLICK'
export const SELECT_ARTICLE_CLICK_READY = 'selectArticle@CLICK_READY'
export const SELECT_ARTICLE_INPUT = 'selectArticle@INPUT'
export const SELECT_ARTICLE_INPUT_CHANGE = 'selectArticle@INPUT_CHANGE'
export const SELECT_ARTICLE_NEXT = 'selectArticle@NEXT'
export const SELECT_ARTICLE_NEXT_READY = 'selectArticle@NEXT_READY'
export const SELECT_ARTICLE_INIT = 'selectArticle@INIT'
export const SELECT_ARTICLE_UNMOUNT = 'selectArticle@UNMOUNT'
export const SELECT_ARTICLE_INIT_READY = 'selectArticle@INIT_READY'

// GUESS_WORD
export const GUESS_WORD = 'guessWord'
export const GUESS_WORD_SHOW = 'guessWord@SHOW'
export const GUESS_WORD_STOP = 'guessWord@STOP'
export const GUESS_WORD_CHECK = 'guessWord@CHECK'
export const GUESS_WORD_INPUT = 'guessWord@INPUT'
export const GUESS_WORD_INPUT_CHANGE = 'guessWord@INPUT_CHANGE'
export const GUESS_WORD_NEXT = 'guessWord@NEXT'
export const GUESS_WORD_NEXT_READY = 'guessWord@NEXT_READY'
export const GUESS_WORD_INIT = 'guessWord@INIT'
export const GUESS_WORD_UNMOUNT = 'guessWord@UNMOUNT'
export const GUESS_WORD_INIT_READY = 'guessWord@INIT_READY'

// WRITE_SENTENCE
export const WRITE_SENTENCE_MIC = 'writeSentence@MIC'
export const WRITE_SENTENCE_MIC_READY = 'writeSentence@MIC_READY'
export const WRITE_SENTENCE = 'writeSentence'
export const WRITE_SENTENCE_CHECK = 'writeSentence@CHECK'
export const WRITE_SENTENCE_INIT = 'writeSentence@INIT'
export const WRITE_SENTENCE_INIT_READY = 'writeSentence@INIT_READY'
export const WRITE_SENTENCE_LISTEN = 'writeSentence@LISTEN'
export const WRITE_SENTENCE_NEXT = 'writeSentence@NEXT'
export const WRITE_SENTENCE_READY = 'writeSentence@READY'
export const WRITE_SENTENCE_SET_INDEX = 'writeSentence@SET_INDEX'
export const WRITE_SENTENCE_SET_INPUT = 'writeSentence@SET_INPUT'
export const WRITE_SENTENCE_SET_NEXT = 'writeSentence@SET_NEXT'
export const WRITE_SENTENCE_SET_OK_CORRECT = 'writeSentence@SET_OK_CORRECT'
export const WRITE_SENTENCE_SHOW = 'writeSentence@SHOW'
export const WRITE_SENTENCE_STEP = 'writeSentence@STEP'
export const WRITE_SENTENCE_STOP = 'writeSentence@STOP'
export const WRITE_SENTENCE_UNMOUNT = 'writeSentence@UNMOUNT'

// LEARNING_MEME
export const LEARNING_MEME = 'learningMeme'
export const LEARNING_MEME_CHECK = 'learningMeme@CHECK'
export const LEARNING_MEME_INIT = 'learningMeme@INIT'
export const LEARNING_MEME_INIT_READY = 'learningMeme@INIT_READY'
export const LEARNING_MEME_LISTEN = 'learningMeme@LISTEN'
export const LEARNING_MEME_NEXT = 'learningMeme@NEXT'
export const LEARNING_MEME_NEXT_READY = 'learningMeme@NEXT_READY'
export const LEARNING_MEME_READY = 'learningMeme@READY'
export const LEARNING_MEME_SET_INPUT = 'learningMeme@SET_INPUT'
export const LEARNING_MEME_SET_NEXT = 'learningMeme@SET_NEXT'
export const LEARNING_MEME_SHOW = 'learningMeme@SHOW'
export const LEARNING_MEME_STOP = 'learningMeme@STOP'
export const LEARNING_MEME_UNMOUNT = 'learningMeme@UNMOUNT'

// CHOOSE_WORD
export const CHOOSE_WORD = 'chooseWord'
export const CHOOSE_WORD_CLICK = 'chooseWord@CLICK'
export const CHOOSE_WORD_CHECK = 'chooseWord@CHECK'
export const CHOOSE_WORD_INIT = 'chooseWord@INIT'
export const CHOOSE_WORD_INIT_READY = 'chooseWord@INIT_READY'
export const CHOOSE_WORD_NEXT = 'chooseWord@NEXT'
export const CHOOSE_WORD_NEXT_READY = 'chooseWord@NEXT_READY'
export const CHOOSE_WORD_INC_INDEX = 'chooseWord@INC_INDEX'
export const CHOOSE_WORD_INC_POINTS = 'chooseWord@INC_POINTS'
export const CHOOSE_WORD_SHOW = 'chooseWord@SHOW'
export const CHOOSE_WORD_STEP = 'chooseWord@STEP'
export const CHOOSE_WORD_STOP = 'chooseWord@STOP'
export const CHOOSE_WORD_UNMOUNT = 'chooseWord@UNMOUNT'

// GENERAL
export const DATA_READY = 'DATA_READY'
const dbBase = 'https://rawcdn.githack.com/selfrefactor/front'
const dbTail = 'e9f0c5eb4900460d7b4891acd6a5b762ee1582fa/files/db.json'
export const DB_URL = `${dbBase}/${dbTail}`
export const DELAY = 500
export const INFO = 'INFO'
export const INIT = 'INIT'
export const INIT_READY = 'INIT_READY'
export const LONG_DELAY = 1000
export const NEXT_TICK = 0
export const ROUTER_CHANGE = '@@router/LOCATION_CHANGE'
export const SETTINGS_RANDOM = 'settings@RANDOM'
export const SETTINGS_TEXT_TO_SPEECH = 'settings@TEXT_TO_SPEECH'
export const SHORT_DELAY = 150
export const UPDATE_POINTS_DELAY = 3000

// SHARED
export const SHARED_ADD_POINTS = 'shared@ADD_POINTS'
export const SHARED_ADD_POINTS_READY = 'shared@ADD_POINTS_READY'
export const SHARED_INIT = 'shared@INIT'
export const SHARED_SHOW_ANSWER = 'shared@SHOW_ANSWER'
export const SHARED_SPEAK = 'shared@SPEAK'
export const SHARED_NEXT_READY = 'shared@NEXT_READY'

// LANGUAGE_CHANGE
export const LANGUAGE_CHANGE_CLICK = 'languageChange@CLICK'
export const LANGUAGE_CHANGE_INIT = 'languageChange@INIT'
export const LANGUAGE_SEPARATOR = ' ⇨ '

// CARRIER
export const CARRIER_CHECK = 'carrier@CHECK'
export const CARRIER_INIT = 'carrier@INIT'
export const CARRIER_INIT_READY = 'carrier@INIT_READY'
export const CARRIER_LISTEN = 'carrier@LISTEN'
export const CARRIER_READY = 'carrier@READY'
export const CARRIER_SHOW = 'carrier@SHOW'
export const CARRIER_STEP = 'carrier@STEP'
export const CARRIER_STOP = 'carrier@STOP'
export const CARRIER_UNMOUNT = 'carrier@UNMOUNT'

// NAVIGATION
export const NAVIGATION_TOGGLE = 'navigation@TOGGLE'
export const NAVIGATION_CHANGE = 'navigation@CHANGE'

// COLORS
export const BACKGROUND = '#b0bec5'
export const ICON_ACTIVE = DARK_BLUE_3
export const ICON_PASSIVE = PINK_0

// NOTIFY
export const NOTIFY_INFO = 'notify@INFO'

// GENERIC_ACTIONS
///////////////////////////
export const sharedSpeak = createActionAnt(SHARED_SPEAK)
export const sharedNextReady = createActionAnt(SHARED_NEXT_READY)
