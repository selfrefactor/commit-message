const githubDate = '2020-03-03'

import {
  drop,
  glue,
  head,
  init,
  match,
  remove,
  replace,
} from 'rambdax'

const allowDoubleSearch = url => {
  return url.includes('duckduckgo') && url.includes('q=%7C')
}

function extractSearchQuery(url){
  if(!url.includes('q=%7C')) return ''
  const [, base] = url.split('q=%7C')
  if(!base) return ''
  const [searchQuery] = base.split('&')

  return searchQuery
}

function openGoogleTab(searchQuery){
  const url = `https://www.google.bg/search?q=${searchQuery}`
  window.open(url, '_blank');
}

async function doubleSearch(searchQuery){
  openGoogleTab(searchQuery)
  window.location.href = remove('%7C', window.location.href)
}

export function googleSearch(){
  if(allowDoubleSearch(window.location.href)){
    const searchQuery = extractSearchQuery(window.location.href)
    if(!searchQuery) return
    return doubleSearch(searchQuery)
  }

  if (
    window.location.href.includes('q=%7C') &&
    window.location.href.includes('google.')
  ){
    const [result] = match(/%7C*[A-Za-z]+/, window.location.href)
    const query = result.substring(3)
    
    const language = 'language%3Ajavascript'
    const date = `pushed%3A>${ githubDate }`
    const stars = 'stars%3A>2'
    const github = '&s=updated&type=Repositories&utf8=✓'
    const end = `${ query }+${ language }+${ date }+${ stars }+${ github }`
    const base = 'https://github.com/search?utf8=%E2%9C%93&q='

    return window.location.href = `${ base }${ end }`
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
    return window.location.href = url
  }
}
