import styled from 'styled-components'
import { ContainerBase, fractionGetters } from '../../_styled/grid'

const numberFractions = 18
const gutterHeight = 0

const { getFraction } = fractionGetters(
  numberFractions,
  gutterHeight,
)

/**
 * Value of 1 fraction(1fr) in `vh`
 */
export const frHeight = getFraction(1)

export const Container = styled(ContainerBase)`
  grid-template-columns: 1fr;
  grid-template-rows: 10fr 1fr 7fr;
  grid-template-areas: "sa_words"
  "sa_translation"
  "sa_image"; 
`
