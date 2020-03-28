import { find } from 'rambdax'

const isGithubURL = () => 
  window.location.href.startsWith('https://github.com/')

const github = {
  condition: isGithubURL,
  execute: whenGithub
}

function whenGithub(){
  document.querySelector('body').style.overflowX = 'hidden'
}

const list = [github]

export function customCSS(){
  const found = find(
    x => x.condition(),
    list
  )
  if(found === undefined) return

  found.execute()

}