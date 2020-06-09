import { switcher } from 'rambdax'

import { youtubeAutoplay } from './_modules/youtube-autoplay'

const isYoutubeURL = x => x.startsWith('https://www.youtube.com')
const activeService = switcher(window.location.href)
  .is(isYoutubeURL, youtubeAutoplay)
  .default(undefined)

if (activeService) activeService()
