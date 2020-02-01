const NEW_POSTS = 100

export function buildUrlAnt(subreddit, marker){
  const base = 'https://www.reddit.com/r'
  const params = `count=${ NEW_POSTS }&limit=${ NEW_POSTS }&after=${ marker }`

  return `${ base }/${ subreddit }/new.json?${ params }`
}
