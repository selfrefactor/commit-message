export const latestTag = (): false | string => {
  const selector = '.Box-row h4 a'
  const tagElements = Array.from(document.querySelectorAll(selector))

  return tagElements.length === 0
    ? false
    : (tagElements[0] as any).text.trim()
}
