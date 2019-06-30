export const getCurrentTag = (): string => {
  const selector = 'div[class="f1 flex-auto min-width-0 text-normal"] > a'
  const tagElements = Array.from(
    document.querySelectorAll(selector),
  )
  if (tagElements.length === 0) {
    return '0.0.0'
  }
  const tagElement: any = tagElements[0]

  return tagElement.text
}
