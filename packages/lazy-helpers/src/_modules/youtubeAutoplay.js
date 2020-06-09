import { delay } from 'rambdax'

export async function youtubeAutoplay(){
  if(!window.location.href.startsWith('https://www.youtube.com')) return

  while(true){
    await delay(10000)
    console.log(1)
  }
}