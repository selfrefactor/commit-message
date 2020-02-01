import { getter } from 'client-helpers'
import { delay } from 'rambdax'
import { mic } from '../actions'
import { normalizeLanguageAnt } from '../../ants/normalizeLanguage';

const BUFFER = 700

export function acceptSpeechBee(dispatch){
  function detect(event) {
    const spoken = event.results[0][0].transcript
    dispatch(mic(spoken))
  }

  const fromLanguage = getter<Language>('fromLanguage')
  const recognition = new webkitSpeechRecognition()

  const restart = e => {
    if (e.error) console.warn('ACCEPT_SPEECH')

    recognition.stop()
    delay(BUFFER)
      .then(() => recognition.start())
      .catch(() => window.location.reload(false))
  }

  recognition.lang = normalizeLanguageAnt(fromLanguage)
  recognition.interimResults = false
  recognition.continious = true
  recognition.maxAlternatives = 1

  recognition.onerror = restart
  recognition.onresult = detect
  recognition.onspeechend = restart

  recognition.start()
}
