export const currentTag = (tag: string): false | string => {
  const tagElements = Array.from(document.querySelectorAll('.tag-info'))

  if (tagElements.length === 0) {
    return false
  }
  const normalize = (x: any): string =>
    Number.isNaN(x[0] * 1) ? x.slice(1) : x

  const latestTag = normalize(tagElements[0].querySelector('span').innerText)

  const condition = tagElements.filter(
    x => normalize(x.querySelector('span').innerText) === tag
  )

  return condition.length === 0 ? latestTag : tag
}
