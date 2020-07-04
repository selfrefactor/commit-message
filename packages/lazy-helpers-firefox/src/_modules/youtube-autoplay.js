import { delay } from 'rambdax'

const dialogSelector = 'yt-confirm-dialog-renderer'

function hasDialog(){
  return document.querySelector(dialogSelector) !== null 
}

function removeElement(el){
  if(!el) return console.log('cannot remove already missing element')
  el.remove()
}

async function removeWarning(){
  console.log('focus body')
  document.querySelector('body').focus()
  await delay(2000)
  console.log('click body')
  document.querySelector('body').click()
  await delay(2000)
  removeElement(document.querySelector(dialogSelector))
  console.log('Success remove modal')
}

export async function youtubeAutoplay(){
  console.log('Start youtube autoplay!!')
  while (true){
    if (hasDialog()) await removeWarning()
    await delay(10000)
  }
}
