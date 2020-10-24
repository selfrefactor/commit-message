import { match, replace, remove, template } from 'rambdax'

const BASE = 'https://gist.github.com/selfrefactor/'

const clickableTemplate = '<a target="_blank" href="{{url}}">{{url}}</a>'

export function applyRule(input){
  if (!input.includes('">http')) return input
  const [ matched ] = match(/">http.+</, input)
  if (!matched) return input
  const url = remove([ '">', '<' ], matched)

  const clickableUrl = template(clickableTemplate, { url })

  return replace(
    url,
    clickableUrl,
    input
  )
}

export function clickableGistBee(){
  if (!window.location.href.startsWith(BASE)) return

  const cells = document.querySelectorAll('.file')

  cells.forEach(cell => {
    const lines = cell.querySelectorAll('tr')
    lines.forEach(line => line.innerHTML = applyRule(line.innerHTML))
  })
}
