import { getterAnt  } from 'client-helpers'
import { DARK_BLUE_3, GREEN_0 } from 'colors'
import { defaultState } from '../constants'

const {
  textToSpeechFlag,
  points,
  fromLanguage,
  toLanguage,
} = getterAnt(defaultState)

const changeLanguage = {
  roughness: 0.6,
  fill: DARK_BLUE_3,
  fillWeight: 2,
}

const roughData: RoughData = {
  changeLanguage,
  info: { roughness: 0.3, fill: GREEN_0, fillWeight: 3 },
  next: { roughness: 0.5, fill: DARK_BLUE_3 },
  random: { roughness: 0, active: false },
  submit: { roughness: 0.5, fill: DARK_BLUE_3 },
  textToSpeech: { roughness: 0, active: textToSpeechFlag, fillWeight: 2 },
}

export function getInitialState(): Store {

  return {
    fromLanguage,
    instructions: '',
    logged: false,
    name: '',
    navigationActive: false,
    points,
    ready: false,
    roughData,
    textToSpeechFlag,
    toLanguage,
    toggleLanguage: false,
  }
}
