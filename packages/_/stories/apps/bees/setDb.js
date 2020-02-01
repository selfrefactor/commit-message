import { anyPass, path } from 'rambdax'

const rules = [
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
].map(x => y => y.endsWith(x))

const isImage = anyPass(rules)

const GFYCAT = 'gfycat.com'
const isForbidden = data => {
  if (data.url.includes(GFYCAT)) return true
  if (data.url.startsWith('http:')) return true

  return false
}

const isGif = data => data.url.endsWith('.gif')
const isVideo = ({ url }) => {
  if (url.startsWith('https://v.redd.it/')) return true

  return false
}

const getVideoSrc = path('media.reddit_video.scrubber_media_url')

export function setDbBee(dbRaw){
  return dbRaw.map(
    ({ data }, i) => {
      if (isForbidden(data)) return false

      if (isImage(data.url)){
        return {
          type : 'image',
          src  : data.url,
        }
      }

      if (isGif(data)){
        return {
          src  : data.url,
          type : 'gif',
        }
      }

      if (isVideo(data)){
        const maybeVideoSrc = getVideoSrc(data)
        if (!maybeVideoSrc) return false

        return {
          type : 'video',
          src  : maybeVideoSrc,
        }
      }

      return false
    }
  ).filter(Boolean)
}
