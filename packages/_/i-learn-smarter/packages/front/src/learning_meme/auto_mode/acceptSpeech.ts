import { getter } from 'client-helpers'
import { defaultTo, delay } from 'rambdax'
import { click } from './click'
import { isNext } from './isNext'
import { normalizeLanguageAnt } from '../../ants/normalizeLanguage'
import { solved } from './solved'

const BUFFER = 700
const DEFAULT_PAUSE = 1433
let pause

async function detect(event) {
  const spoken = event.results[0][0].transcript

  if (isNext(spoken)) return click('next')

  const input = document.getElementsByTagName('input')
  if (solved()) return

  input[0].value = spoken
  await delay(pause)
  click('submit')

  if (pause === DEFAULT_PAUSE) return

  await delay(pause * 2)
  click('next')
}

export function acceptSpeech(){
  const fromLanguage = getter<Language>('fromLanguage')
  console.log({fromLanguage})
  const recognition = new webkitSpeechRecognition()
  pause = defaultTo(DEFAULT_PAUSE, getter<number>('pause') * 1000)

  const restart = e => {
    if (e.error) console.warn('ACCEPT_SPEECH')

    recognition.stop()
    delay(BUFFER).then(() => recognition.start())
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
