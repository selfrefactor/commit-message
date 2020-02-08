import React from 'react'
import styled from 'styled-components'
import { pass, dropLast, trim, sort, switcher, uuid } from 'rambdax'
import { splitPerLine } from 'string-fn'

function withinNumberLines(text, perLine, limit){
  let counter = perLine
  const len = text.length
  let answer

  while (counter < len){
    counter++
    const maybeAnswer = splitPerLine({
      text,
      perLine: counter,
    })
    if (maybeAnswer.length <= limit){
      answer = maybeAnswer
      counter = len
    }
  }

  if (!answer){
    return withinNumberLines(trim(dropLast(3, text)), perLine, limit)
  }

  return answer
}

function fallbackFontSize(lines, perLine, fallbackFontSize){
  const [ max ] = sort((a, b) => (a.length < b.length ? 1 : -1))(lines)

  const comparator = x => y => x + perLine > y

  const fontSize = switcher(max.length)
    .is(comparator(4), fallbackFontSize - 0.2)
    .is(comparator(8), fallbackFontSize - 0.3)
    .is(comparator(12), fallbackFontSize - 0.4)
    .is(comparator(16), fallbackFontSize - 0.5)
    .is(comparator(23), fallbackFontSize - 0.6)
    .default(0.85)

  return fontSize
}

export function Text({
  text,
  perLine,
  baseFontSize,
  parentProps = {},
  evalStyled = '',
}){
  const okInput = pass(text, perLine, baseFontSize)(String, Number, Number)

  if (!okInput) return null

  const FONT_SIZES = {
    1: baseFontSize,
    2: baseFontSize - 0.15,
    3: baseFontSize - 0.3,
  }
  const linesRaw = splitPerLine({
    text,
    perLine,
  })

  const notManyLines = linesRaw.length <= 3

  const lines = notManyLines ?
    linesRaw :
    withinNumberLines(text, perLine, 18)

  const fontSize = notManyLines ?
    FONT_SIZES[ lines.length ] :
    fallbackFontSize(lines, perLine, baseFontSize)

  const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
    padding: 0;
    margin: 0;
    height: 100%;
    outline: 2px solid #35c;
    ${ evalStyled }
  `

  const Line = styled.p`
    width: 90%;
    font-size: ${ fontSize }vh;
    line-height: ${ fontSize * 1.7 }vh;
    height: ${ fontSize * 1.7 }vh;
    overflow: hidden;
    margin: 0;
    padding: 0;
  `

  const Lines = lines.map((singleLine, i) => (
    <Line key={`${ uuid() }-${ i }`}>{singleLine}</Line>
  ))

  return <Container {...parentProps}>{Lines}</Container>
}

export const TextCell = (perLine, baseFontSize, evalStyled) => ({
  children,
  className,
}) => {
  const extraProps = className ? { className } : {}

  return (
    <Text
      baseFontSize={baseFontSize}
      evalStyled={evalStyled}
      parentProps={extraProps}
      perLine={perLine}
      text={children}
    />
  )
}
