import { delay } from 'rambdax'

const dialogSelector = 'yt-confirm-dialog-renderer'
const confirmSelector = 'confirm-button'

function hasDialog(){
  return document.querySelector(dialogSelector) !== null && document.getElementById(confirmSelector)
}

function confirmAutoplay(){
  const el = document.getElementById(confirmSelector)
  if (!el) return console.log('Hmm! Confirm selector seems wrong')
  el.click()
  console.log('Success!')
}

export async function youtubeAutoplay(){
  console.log('Start youtube autoplay')
  while (true){
    await delay(10000)
    if (hasDialog()) confirmAutoplay()
  }
}
