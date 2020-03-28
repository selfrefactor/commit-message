const githubDate = '2018-09-07'

import {
  compose,
  drop,
  glue,
  head,
  identity,
  init,
  match,
  replace,
} from 'rambdax'

const fn = compose(
  head,
  identity,
  match(/%7C*[A-z].+?&/),
)

export function googleSearch(){
  if (
    window.location.href.includes('search?q=%7C') &&
    window.location.href.includes('google.')
  ){
    const result = fn(window.location.href)
    const query = result.substring(3, result.length - 1)

    const language = 'language%3Ajavascript'
    const date = `pushed%3A>${ githubDate }`
    const stars = 'stars%3A>2'
    const github = '&s=updated&type=Repositories&utf8=✓'
    const end = `${ query }+${ language }+${ date }+${ stars }+${ github }`
    const base = 'https://github.com/search?utf8=%E2%9C%93&q='

    window.location.href = `${ base }${ end }`
  }
  if (
    window.location.href.includes('search?q=%60') &&
    window.location.href.includes('google.') &&
    !window.location.href.includes('soundcloud')
  ){
    const baseQuery = drop(
      3,
      head(match(/%60*[A-z].+?&/, window.location.href))
    )

    const query = replace(' ', '+')(init(baseQuery))

    const url = glue(`
      https://
      www.google.bg/search?q=
      allintitle:%22${ query }%22+
      site:soundcloud.com
    `, '')
    window.location.href = url
  }
}
