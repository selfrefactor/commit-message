export function copy(text) {

  const span = document.createElement('span')
  span.textContent = text
  span.style.whiteSpace = 'pre' // Preserve consecutive spaces and newlines

  const iframe: any = document.createElement('iframe')
  iframe.sandbox = 'allow-same-origin'
  document.body.appendChild(iframe)

  const win = iframe.contentWindow
  win.document.body.appendChild(span)

  const selection = win.getSelection()

  const range = win.document.createRange()
  selection.removeAllRanges()
  range.selectNode(span)
  selection.addRange(range)

  try {
    win.document.execCommand('copy')
  } catch (err) {
    console.log(err)
  }

  selection.removeAllRanges()
  span.remove()
  iframe.remove()
}
