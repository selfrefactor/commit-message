export function splitPerLine({
  text,
  perLine = 30,
  splitChar = ' ',
}){
  const words = text.split(splitChar)
  const toReturn = []
  let line = ''

  words.forEach(word => {
    const newLine = line + (line === '' ? '' : ' ') + word
    if (newLine.length >= perLine){
      toReturn.push(line)
      line = word
    } else {
      line = newLine
    }
  })

  if (line !== ''){
    toReturn.push(line)
  }

  return toReturn
}

