import { switcher, once } from 'rambdax'
import * as React from 'react'
import { render } from 'react-dom'
import { initLocalState } from 'client-helpers-fn'
import { RootApp, store } from './app'
import { createAction } from './createAction'
import { INIT } from './constants'
import { copyToClipboard } from './_helpers/copyToClipboard.js'
import { isYoutubeURL } from './common'
import { germanShortkeys } from './_modules/germanShortkeys'
import { googleSearch } from './_modules/googleSearch'
import { youtubeAutoplay } from './_modules/youtubeAutoplay'
import { customCSS } from './_modules/customCSS'
import { isIframe } from './_helpers/isIframe'
import { youtubeToAudio } from './_modules/youtubeToAudio'
import { logAnt } from './ants/log'
import { alarmBee } from './bees/alarm'
import { clickableGistBee } from './bees/clickableGist'

const id = 'lazy-helpers-container'
const pass = !isIframe()
initLocalState('LAZY_HELPERS')

if (document.querySelector(`#${ id }`) === null && pass){
  try {
    const element = document.createElement('div')
    element.setAttribute('id', id)
    document.body.appendChild(element)
  } catch (e){
    logAnt('err.create.element')
  }
}

const renderOnce = once(() => {
  render(
    <RootApp />,
    document.querySelector(`#${ id }`)
  )
})

const renderFn = () => {
  renderOnce(undefined)
  store.dispatch(createAction(INIT, undefined))
}

const methods = {
  renderFn,
  youtubeToAudio,
} 

if (pass){
  youtubeAutoplay()
  clickableGistBee()
  googleSearch()
  alarmBee()
  germanShortkeys()
  customCSS()
}

if (process.env.NODE_ENV === 'production' && pass){
  const onRequest = request => {
    if (request.lazyHelpers){
      const methodKey = switcher(window.location.href)
        .is(isYoutubeURL, 'youtubeToAudio')
        .default('renderFn')

      methods[ methodKey ]()
    }

    if (request.exportBookmarks){
      copyToClipboard(JSON.stringify(request.payload))
    }
  }

  chrome.runtime.onMessage.addListener(onRequest)
} else if (pass){
  renderFn()
}
