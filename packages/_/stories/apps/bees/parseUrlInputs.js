import {
  defaultToStrict,
  filter,
  headObject,
} from 'rambdax'

const KEY = 'REDDIT_VIEWER_PLAY'
const DEFAULT_SUBREDDIT = 'ProgrammerHumor'

export const parseUrlInputsBee = input => {
  const subredditRaw = filter(
    x => x === true,
    input
  )
  const { prop } = headObject(defaultToStrict(
    { [ DEFAULT_SUBREDDIT ] : true },
    subredditRaw
  ))
  if (input.play){
    localStorage.setItem(KEY, input.play)
  } else {
    localStorage.setItem(KEY, '12')
  }

  return {
    specialMode : input.special !== undefined,
    specialTick : input.special,
    subreddit   : prop,
    play        : Number(localStorage.getItem(KEY)),
  }
}
