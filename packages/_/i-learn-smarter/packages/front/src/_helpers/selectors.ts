import { createSelector } from 'reselect'
const fromLanguageSelector = store => store.fromLanguage
const nameSelector = store => store.name
const randomSelector = store => store.randomFlag
const textToSpeechSelector = store => store.textToSpeechFlag
const toLanguageSelector = store => store.toLanguage

const languageSelector = createSelector(
  fromLanguageSelector,
  toLanguageSelector,
  (fromLanguage, toLanguage) => ({ fromLanguage, toLanguage }),
)

export const commonSelector = createSelector(
  fromLanguageSelector,
  nameSelector,
  randomSelector,
  textToSpeechSelector,
  toLanguageSelector,
  (
    fromLanguage,
    name,
    randomFlag,
    textToSpeechFlag,
    toLanguage,
  ) => ({
    fromLanguage,
    name,
    randomFlag,
    textToSpeechFlag,
    toLanguage,
  }),
)

interface StoreSelector {
  getState(): any
}

export const storeSelector = createSelector(
  (store: StoreSelector) => store.getState().store,
  store => store,
)

export const getLanguagePair = store => languageSelector(storeSelector(store))
export const getCommons = store => commonSelector(store.getState().store)
