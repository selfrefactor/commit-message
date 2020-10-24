import { getYoutubeID } from '../_helpers/getYoutubeID'
import { postAdmin } from '../_helpers/postAdmin'

export async function youtubeToAudio() {
  const youtubeID = getYoutubeID(window.location.href)
  const name = document.querySelector('h1').textContent
  console.log(`youtubeID '${youtubeID}'`)

  const body = {
    name,
    youtubeID,
  }

  await postAdmin({
    body: body,
    route: 'youtube-to-audio',
  })
}