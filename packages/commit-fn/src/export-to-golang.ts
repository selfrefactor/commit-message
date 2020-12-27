import {ALL_LABELS} from './constants'
const LINE_LIMIT = 50

export function exportToGolang() {
  const lines: string[] = []
  let currentLine = ''

  ALL_LABELS.forEach((x, i) => {
    const newCurrentLine =  i === 0 || currentLine === '' ? x : `${currentLine} | ${x}`
    const isLast = i === ALL_LABELS.length - 1

    if (isLast){
      lines.push(newCurrentLine)
    } else if (newCurrentLine.length > LINE_LIMIT) {
      lines.push(newCurrentLine)
      currentLine = ''
    } else {
      currentLine = newCurrentLine
    }
  })

  const toSave = lines.map(line => {
    return `fmt.Printf("\\n${line.trim()}\\n")`
  }).join('\n')

  return toSave
}
