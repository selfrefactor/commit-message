import { testURL } from '.'

const base = 'https://ilearnsmarter.com'

const url = {
  home: base,
  a: `${base}/learning-meme`,
  b: `${base}/write-sentence`,
  c: `${base}/guess-word`,
  d: `${base}/choose-word`,
  f: `${base}/user`,
}

async function debug() {
  const result = await testURL(url.c)
  console.log(result)
}

debug()
