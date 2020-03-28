import { wordsX, takeArguments, maskSentence } from 'string-fn'
import { replace, shuffle} from 'rambdax'
import { setter, getter } from 'client-helpers'
const SELECTOR = '.text-content-main'
const BASE = 'https://chitanka.info/text/'

function changeChitankaFlag(flag){
  setter('chitanka', flag)
  const [newLocation] = window.location.href.split('?chitanka')
  window.location.href = newLocation
}

export function chitankaBee(){
  if (!window.location.href.startsWith(BASE)) return
  const {chitanka} = takeArguments(window.location.href)
  
  if(chitanka) changeChitankaFlag(chitanka)
  if(getter('chitanka') !== 'on') return

  const els = Array.from(
    document.querySelector(SELECTOR).querySelectorAll('p')
  )

  els.forEach((element, i) => {
    if(element.textContent.length < 70) return
    const words = wordsX(element.textContent)
    const longWords = words.filter(x => x.length > 5)
    const [ toReplace ] = shuffle(longWords)

    if(!toReplace) return

    const {visible: [replacer]} = maskSentence({
      replacer: '-',
      easyMode: true,
      easierMode: false,
      randomMode: true,
      sentence: toReplace,
    })

    const newHtml = replace(
      toReplace,
      replacer,
      element.innerHTML
    )
    element.innerHTML = newHtml
  })
}