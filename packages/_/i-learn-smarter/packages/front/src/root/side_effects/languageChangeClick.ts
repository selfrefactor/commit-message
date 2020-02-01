import { setter } from 'client-helpers'

export function languageChangeClick(action: Action, state: Store): Store {
  setter('fromLanguage', action.payload.from)
  setter('toLanguage', action.payload.to)

  return {
    ...state,
    fromLanguage: action.payload.from,
    toLanguage: action.payload.to,
    toggleLanguage: !state.toggleLanguage,
  }
}
