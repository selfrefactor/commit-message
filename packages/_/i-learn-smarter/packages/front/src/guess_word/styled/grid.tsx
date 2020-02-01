import { DARK_2 } from 'colors'
import { defaultTo } from 'rambdax'
import styled from 'styled-components'
import { CenteredItem, ContainerBase, fractionGetters } from '../../_styled/grid'

const numberFractions = 11
const gutterHeight = 5

export const Container = styled(ContainerBase)`
  display: grid;
  grid-template-columns: 1fr 12fr 1fr;
  grid-template-rows: 1fr 1fr 2fr 1fr 5fr 1fr;
  grid-row-gap: 1vh;
  grid-template-areas: ". gw_input ."
  ". gw_word ." 
  ". gw_related ." 
  ". gw_sentence ." 
  ". gw_image ." 
  ". gw_translated .";
`

export const { getFraction } = fractionGetters(
  numberFractions,
  gutterHeight,
)

/**
 * Value of 1 fraction(1fr) in `vh`
 */
export const frHeight = getFraction(1)

export const Text = styled.div`
  height: ${1 * frHeight}vh;
  padding-top: ${0.15 * frHeight}vh;
  line-height: ${0.7 * frHeight}vh;
  font-size: ${0.35 * frHeight}vh;
  width: 100%;
`

interface GetText {
  color?: string
  bold?: boolean
}

export function CTextContainer(area: string) {

  return styled(CenteredItem)`
  height: ${1 * frHeight}vh;
  grid-area: ${area};
`
}

export function CText(input: GetText) {
  const color = defaultTo(DARK_2, input.color)
  const fontWeight = defaultTo(false, input.bold) ?
    600 :
    400

  return styled(Text)`
  font-weight: ${fontWeight};
  color: ${color};
`
}
