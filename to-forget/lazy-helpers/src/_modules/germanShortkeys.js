import { copyToClipboard } from '../_helpers/copyToClipboard'

const copyAndPaste = (x) => {
  if (navigator.clipboard === undefined){
    copyToClipboard(x)
    return document.execCommand('paste')
  }
  
  navigator
    .clipboard
    .writeText(x)
    .then(() => {
      document.execCommand('paste')
    })
}

export function germanShortkeys() {
  document.addEventListener('keydown', e => {
    if (e.altKey && e.code === 'KeyS') {
      copyAndPaste('ß')
    }
    if (e.altKey && e.code === 'KeyA') {
      copyAndPaste('ä')
    }
    if (e.altKey && e.code === 'KeyO') {
      copyAndPaste('ö')
    }
    if (e.altKey && e.code === 'KeyU') {
      copyAndPaste('ü')
    }
  })
}
