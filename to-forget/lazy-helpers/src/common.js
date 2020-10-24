import { path, split } from 'rambdax'
import { unmountComponentAtNode } from 'react-dom'

import { select } from 'redux-saga/effects'
import {
  GOOGLE_IMAGE_URL_CONDITION,
  GOOGLE_SEARCH_URL_CONDITION,
  YOUTUBE_URL_CONDITION,
} from './constants'

export function* close(){
  const reactContainer = document.querySelector('#lazy-helpers-container')
  if (reactContainer !== null){
    unmountComponentAtNode(reactContainer)
  }
}

export function isImgurURL(){
  const [ , , urlBase, reddit, subreddit, image ] = split('/', window.location.href)

  return urlBase === 'imgur.com' &&
    reddit === 'r' &&
    subreddit !== undefined &&
    image !== undefined
}

export const isGoogleSearchURL = currentURL => !currentURL.includes(GOOGLE_IMAGE_URL_CONDITION) &&
    currentURL.startsWith(GOOGLE_SEARCH_URL_CONDITION)

export const isGoogleImageURL = () =>
  window.location.href.includes(GOOGLE_IMAGE_URL_CONDITION)

export const isYoutubeURL = currentURL =>
  currentURL.startsWith(YOUTUBE_URL_CONDITION)

export const getTimeValue = () => select(path('rootStore.timeComponentValue'))

export const getCancel = () => select(path('rootStore.cancel'))
