import { delay } from 'rambdax'

const dialogSelector = 'yt-confirm-dialog-renderer'
const confirmSelector = 'confirm-button'

function hasDialog(){
  return document.querySelector(dialogSelector) !== null && document.getElementById(confirmSelector) !== null
}

async function removeWarning(){
  console.log('start remove modal')
  const el = document.getElementById(confirmSelector)
  if (!el) return console.log('Hmm! Confirm selector seems wrong')
  el.click()
  console.log('Success!')
  await delay(500)
  document.getElementById(confirmSelector).remove()
  await delay(500)
  document.querySelector(dialogSelector).remove()
}

export async function youtubeAutoplay(){
  console.log('Start youtube autoplay!')
  while (true){
    if (hasDialog()) await removeWarning()
    await delay(10000)
  }
}
